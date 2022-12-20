import type { ScoreT } from './localStore'
import type { DataT } from './localStore'
import type { CriterionT } from './localStore'



export	function getCriteriaNames(criteria: CriterionT[]): string[] {
		let criteriaNames: string[] = [];
		criteria.forEach((criterion) => {
			criteriaNames = [...criteriaNames, criterion.name];
		});
		return criteriaNames
	}

export function updateScores(scores: ScoreT[], criteriaNames: string[]): ScoreT[] {
    // only add / delete scores, return newScores with nonexistent scores set to 0
    // should be run every time criteria names change
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
    let importances = data.criteria.map((criterion) => (criterion.importance));
    let importanceSum = 0
    data.criteria.forEach((criterion) => {
        importanceSum += criterion.importance
    })
    let weights = importances.map((importance) => (importance / importanceSum));
    data.options.forEach((option, j) => {
        let finalScore = 0;
        data.criteriaNames.forEach((criterionName, k) => {
            finalScore += weights[k] * data.options[j].scores[k].value;
        })
        data.options[j].finalScore = finalScore
        });
    return data
}


export function updateCriteriaNamesInOptions(data: DataT): DataT {
		let criteriaNames = getCriteriaNames(data.criteria);
        data.options.forEach((option, j) => {
            data.criteriaNames = criteriaNames
            data.options[j].criteriaNames = criteriaNames
            data.options[j].scores = updateScores(data.options[j].scores, criteriaNames)
            });
        return data;
        };


