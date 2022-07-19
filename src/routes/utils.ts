import type { ScoreT } from './localStore'
import type { DataT } from './localStore'
import type { CriterionT } from './localStore'
import type { CriteriaT } from './localStore'

export function resetScores(criteriaNames: string[]): ScoreT[] {
    // completely reset scores putting value on 0, useful when creating anew
    let scores: ScoreT[] = [];
    criteriaNames.forEach((criterionName) => {
        let newScore = {
            name: criterionName,
            value: 0
        };
        scores = [...scores, newScore];
    });
    return scores
}

export	function updateCriteriaVariables(criteria: CriterionT[]): [number, number, string[]] {
		let criteriaSum = 0;
		let nCriteria = 0;
		let criteriaNames: string[] = [];
		criteria.forEach((criterion) => {
			criteriaSum += criterion.importance;
			nCriteria += 1;
			criteriaNames = [...criteriaNames, criterion.name];
		});
		return [criteriaSum, nCriteria, criteriaNames];
	}

export function updateScores(scores: ScoreT[], criteriaNames: string[]): ScoreT[] {
    // only add / delete scores 
    let newScores: ScoreT[] = [];
    criteriaNames.forEach((criterionName) => {
        let ind = scores.findIndex((score) => score.name === criterionName)
        if (ind === -1) {  
            newScores = [...newScores, {name: criterionName, value: 0}];
        }
        else {
            newScores = [...newScores, scores[ind]];
        }
    });
    return newScores
}

export function computeFinalScores(data: DataT): DataT {
    data.forEach((criteriaData: CriteriaT, i: number) => {
		let [criteriaSum, nCriteria, criteriaNames] = updateCriteriaVariables(criteriaData.criteria);
        let importances = criteriaData.criteria.map((criterion) => (criterion.importance));
        let weights = importances.map((importance) => (importance / criteriaSum));
        criteriaData.evaluations.forEach((evaluation, i) => {
            evaluation.options.forEach((option, j) => {
                let finalScore = 0;
                criteriaNames.forEach((criterionName, k) => {
                    finalScore += weights[k] * evaluation.options[j].scores[k].value;
                })
                criteriaData.evaluations[i].options[j].finalScore = finalScore
                });
            });
        data[i] = criteriaData;
        }
    )
    return data
}

export function updateCriteriaNames(criteriaData: CriteriaT): CriteriaT {
		let [criteriaSum, nCriteria, criteriaNames] = updateCriteriaVariables(criteriaData.criteria);
        criteriaData.evaluations.forEach((evaluation, i) => {
            evaluation.options.forEach((option, j) => {
                criteriaData.evaluations[i].criteriaNames = criteriaNames
                criteriaData.evaluations[i].options[j].criteriaNames = criteriaNames
                criteriaData.evaluations[i].options[j].scores = updateScores(criteriaData.evaluations[i].options[j].scores, criteriaNames)
                });
            });
        return criteriaData;
        };

