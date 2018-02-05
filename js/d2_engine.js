var D2Engine = function() {
  var devilGroup = d2DevilGroup;
  var devils = d2Devils;
  var devilRecipe = d2DevilRecipe;
  var specialRecipe = d2SpecialRecipe;

  function digCombination(option) {
    let target = option.targetName;
    let list = option.baseList;
    let depth = option.depth;
    let footprint = option.footprint;

    var targetData = d2Devils[target];
    var combinations = {
      name: target,
      rare: null,
      grade: null,
      combinations: null,
      complete: false,
      sort: function() {
        orderByMaxGradeSort(this.combinations);
      },
      sortTree: function() {
        this.sort();
        if (Array.isArray(this.combinations)) {
          this.combinations.forEach(function(combination) {
            combination.forEach(function(devil) {
              devil.sortTree();
            });
          });
        }
      }
    };

    if (targetData) {
      combinations.rare = targetData.rare;
      combinations.grade = targetData.grade;
    }

    if (list.includes(target)) {
      combinations.complete = true;
      return combinations;
    }

    if (depth < 0) return combinations;

    footprint = footprint || [];
    if (footprint.includes(target)) return combinations;

    next = nextCombinations(target, list, depth, footprint);
    combinations.combinations = next;
    combinations.complete = searchComplete(next);
    return combinations;
  }

  function　orderByMaxGradeSort(combinations) {
    if (!Array.isArray(combinations)) return;
    for (let i = 0; i < combinations.length; i++) {
      for (let j = combinations.length - 1; i < j; j--) {
        let leftGrade = maxGrade(combinations[i]);
        let rightGrade = maxGrade(combinations[j]);
        if (leftGrade > rightGrade) {
          let tmp = combinations[i];
          combinations[i] = combinations[j];
          combinations[j] = tmp;
        }
      }
    }
  }

  function maxGrade(combination) {
    if (combination.maxGrade) return combination.maxGrade;
    let maxGrade = 0;
    combination.forEach(function(devil) {
      if (maxGrade < devil.grade) maxGrade = devil.grade;
    });
    return combination.maxGrade = maxGrade;
  }

  function searchComplete(combinations) {
    var complete = false;
    combinations.forEach(function(combination) {
      combinationComplete = true;
      combination.forEach(function(devil) {
        if (!devil.complete) combinationComplete = false;
      });
      if (combinationComplete) complete = true;
    });
    return complete;
  }

  function nextCombinations(target, list, depth, footprint) {
    combinationList = searchCombination(target);
    if (!combinationList) return null;

    return Array.prototype.map.call(combinationList, function(combination) {
      return Array.prototype.map.call(combination, function(nextTarget) {
        let option = {
          targetName: nextTarget,
          baseList: list,
          depth: depth - 1,
          footprint: footprint.concat(target)
        };
        return digCombination(option);
      });
    });
  }

  function searchCombination(target) {
    var combination = specialCombination(target);
    if (combination) return combination;
    return basicCombination(target);
  }

  function specialCombination(target) {
    return specialRecipe[target];
  }

  function basicCombination(target) {
    var targetData = devils[target];
    var lowGrade = 0;

    if (!targetData) return null;

    let devilsInGroup = devilsWithGroup(targetData.group);
    for (key in devilsInGroup) {
      let devil = devilsInGroup[key];
      if (targetData.grade > devil.grade) {
        if (devil.grade > lowGrade) lowGrade = devil.grade;
      }
    }

    return findChildren(targetData, lowGrade);
  }

  function findChildren(data, low) {
    var children = [];

    let recipe = devilRecipe[data.group];
    let high = data.grade
    recipe.forEach(function(groupSet) {
      let devils1 = devilsWithGroup(groupSet[0]);
      let devils2 = devilsWithGroup(groupSet[1]);
      for (key1 in devils1) {
        let devil1 = devils1[key1];
        for (key2 in devils2) {
          let devil2 = devils2[key2];
          let totalGrade = devil1.grade + devil2.grade;

          if ((low * 2) <= totalGrade && totalGrade < (high * 2)) {
            children.push([key1, key2]);
          }
        }
      }
    });

    return children;
  }

  var devilsWithGroupCache = {};
  function devilsWithGroup(group) {
    let groupedDevils = devilsWithGroupCache[group];
    if (groupedDevils) return groupedDevils;

    groupedDevils = {};
    for (key in devils) {
      let devil = devils[key];
      if (group == devil.group) groupedDevils[key] = devil;
    }
    return devilsWithGroupCache[group] = groupedDevils;
  }

  return {
    searchCombinationTree: function(target, list, depth) {
      return digCombination(target, list, depth, null);
    }
  }
}
