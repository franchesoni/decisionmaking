import type { ScoreT } from './localStore'
import type { DataT } from './localStore'
import type { CriterionT } from './localStore'

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
    let [criteriaSum, nCriteria, criteriaNames] = updateCriteriaVariables(data.criteria);
    let importances = data.criteria.map((criterion) => (criterion.importance));
    let weights = importances.map((importance) => (importance / criteriaSum));
    data.options.forEach((option, j) => {
        let finalScore = 0;
        criteriaNames.forEach((criterionName, k) => {
            finalScore += weights[k] * data.options[j].scores[k].value;
        })
        data.options[j].finalScore = finalScore
        });
    return data
}

export function updateCriteriaNames(data: DataT): DataT {
		let [criteriaSum, nCriteria, criteriaNames] = updateCriteriaVariables(data.criteria);
        data.options.forEach((option, j) => {
            data.criteriaNames = criteriaNames
            data.options[j].criteriaNames = criteriaNames
            data.options[j].scores = updateScores(data.options[j].scores, criteriaNames)
            });
        return data;
        };


