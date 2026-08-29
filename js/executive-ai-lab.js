(function () {
  var copy = {
    growth: 'growth opportunities', customers: 'customer loss', execution: 'execution bottlenecks'
  };
  function update() {
    var question = document.querySelector('[name="question"]:checked').value;
    var connected = document.querySelector('[name="context"]:checked').value === 'connected';
    var human = document.querySelector('[name="review"]:checked').value === 'human';
    var state = 'FRAGMENTED SIGNAL', title = 'A fast answer is not the same as an enterprise answer.';
    var body = 'The system can summarise selected material about ' + copy[question] + ', but it cannot see contradictions across functions or know which evidence is decision-grade.';
    var confidence = '32%', risk = 'HIGH';
    if (connected) { state = 'CONNECTED INTELLIGENCE'; title = 'The company can see more of itself.'; body = 'Patterns across functions become visible, but broader access also raises questions of permission, provenance and which source deserves authority.'; confidence = '67%'; risk = 'MEDIUM'; }
    if (connected && human) { state = 'DECISION-READY SYSTEM'; title = 'Intelligence becomes useful when accountability is designed in.'; body = 'Connected evidence reveals patterns in ' + copy[question] + '. A named domain leader tests assumptions, resolves conflict and owns the decision that follows.'; confidence = '86%'; risk = 'CONTROLLED'; }
    if (!connected && human) { state = 'HUMAN-CHECKED / PARTIAL'; title = 'Accountability helps. Missing context still limits the decision.'; body = 'A domain leader can challenge the answer, but fragmented knowledge keeps important signals and contradictions out of view.'; confidence = '51%'; risk = 'MEDIUM'; }
    document.getElementById('answerState').textContent = state; document.getElementById('answerTitle').textContent = title; document.getElementById('answerBody').textContent = body; document.getElementById('confidence').textContent = confidence; document.getElementById('risk').textContent = risk;
  }
  document.querySelectorAll('.controls input').forEach(function (input) { input.addEventListener('change', update); });
}());
