function summon() {
  var engine = new D2Engine;
  var getValue = function(element) {
    return element.value;
  };

  let option = {
    targetName: getValue(document.getElementById('target')),
    baseList: Array.prototype.map.call(document.getElementsByName('base'), getValue),
    depth: getValue(document.getElementById('depth'))
  };

  combinationTree = engine.searchCombinationTree(option);
  combinationTree.sortTree();

  let resultDiv = document.getElementById('summon-result');
  resultDiv.innerHTML = '';
  renderDevilTree(resultDiv, combinationTree);
}

function renderDevilTree(element, tree) {
  let devilTreeDiv = document.createElement('div');
  devilTreeDiv.id = 'devil-tree';
  element.appendChild(devilTreeDiv);
  appendDevilTree(devilTreeDiv.id, tree);
}

function appendDevilTree(id, devil) {
  let div = document.getElementById(id);

  let nameSpan = createNameSpan(devil);
  div.appendChild(nameSpan);

  let combinationUl = document.createElement('ul');
  combinationUl.id = id + '-1';

  div.appendChild(combinationUl);
  appendCombinationList(combinationUl.id, devil.combinations);
}

function createNameSpan(devil) {
  let nameSpan = document.createElement('span');
  nameSpan.classList.add('name');
  if (devil.complete) nameSpan.classList.add('complete');
  nameText = devil.name;
  if (devil.grade && devil.rare) {
    nameText = nameText + "(" + devil.grade + " " + "☆" + devil.rare + ")";
  }
  nameSpan.innerText = nameText;
  return nameSpan;
}

function appendCombinationList(id, combinations) {
  var ul = document.getElementById(id);
  var index = 1;

  if (!combinations) return;
  combinations.forEach(function(combination) {
    let combinationLi = document.createElement('li');
    combinationLi.classList.add('combination');

    let subjectSpan = document.createElement('span');
    subjectSpan.classList.add('subject');
    subjectSpan.innerHTML = subjectName(combination);
    combinationLi.appendChild(subjectSpan);

    let devilUl = document.createElement('ul');
    devilUl.id = id + '-' + index++;
    combinationLi.appendChild(devilUl);

    ul.appendChild(combinationLi);
    appendDevilLi(devilUl.id, combination);
  });
}

function subjectName(combination) {
  nameSpanList = combination.map(function(devil) {
    let nameSpan = createNameSpan(devil);
    return nameSpan.outerHTML;
  });
  return nameSpanList.join('');
}

function appendDevilLi(id, devils) {
  let ul = document.getElementById(id);

  var index = 1;
  devils.forEach(function(devil) {
    let devilLi = document.createElement('li');
    devilLi.classList.add('devil');

    let nameSpan = createNameSpan(devil);
    devilLi.appendChild(nameSpan);

    let combinationUl = document.createElement('ul');
    combinationUl.id = id + '-' + index++;
    devilLi.appendChild(combinationUl);

    ul.appendChild(devilLi);

    if (Array.isArray(devil.combinations)) {
      devilLi.addEventListener('click', function(event) {
        var li = liChildren(event.target);
        if(li == devilLi) {
          if (li.classList.contains('active')) {
            conbinationElement = document.getElementById(combinationUl.id);
            conbinationElement.innerHTML = "";
          } else {
            appendCombinationList(combinationUl.id, devil.combinations);
          }
        }
      });

      //   sleepTime = 500 * Math.random();
      //   timerId = setTimeout(appendCombinationList, sleepTime, combinationUl.id, devil.combinations);

      //   appendCombinationList(combinationUl.id, devil.combinations);
    } else {
      devilLi.classList.add('end');
    }
  });
}

function liChildren(tag) {
  if (tag.tagName === 'LI') return tag;
  if (tag.parentNode) return liChildren(tag.parentNode);
  return null;
}

document.querySelector('body').addEventListener('click', function(event) {
  var li = liChildren(event.target);
  if(li) {
    if (li.classList.contains('active')) {
      li.classList.remove('active');
    } else {
      li.classList.add('active');
    }
  }
});
