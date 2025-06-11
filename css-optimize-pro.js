
(function() {
  // ����� ��������� ������� ���� (��� ������� ���� ������ ���)
  const allowedDomains = ["https://tsttawi.blogspot.com", "yourcustomer.blogspot.com"];

  // ���� ������� ������ ���� www
  const currentDomain = window.location.hostname.replace(/^www\./, "");

  // �� ������� �� �� ��� ������� ���� ? ���� ���
  if (!allowedDomains.includes(currentDomain)) {
    // ���� �� ����� ������
    document.documentElement.innerHTML = "";
    // ���� ����� �� ��������
    console.warn("�� ��� ������ ��� ��� ������: " + currentDomain);
    // �� ��� ����� ������
    // window.location.href = "https://example.com/blocked";
  }
})();
<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>���� ��� ������ ������ CSS ���������</title>
  <link href="https://fonts.googleapis.com/css2?family=Cairo:wght@500;700&display=swap" rel="stylesheet" />
  <style>
    * { box-sizing: border-box; }
    body {
      font-family: 'Cairo', sans-serif;
      background: #f3f0ff;
      margin: 0; padding: 0;
      color: #333;
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 20px;
    }
    h1 {
      color: #7b1fa2;
      margin-bottom: 30px;
      font-weight:700;
      text-align:center;
    }
    .container {
      max-width: 960px;
      width: 100%;
      background: #ede7f6;
      border-radius: 15px;
      box-shadow: 0 8px 20px rgba(123,31,162,0.2);
      padding: 25px;
      margin-bottom: 30px;
    }
    textarea {
      width: 100%;
      height: 180px;
      padding: 15px;
      font-size: 16px;
      border: 2px solid #7b1fa2;
      border-radius: 10px;
      background: #fff;
      resize: vertical;
      direction: rtl;
      text-align: right;
      font-family: 'Cairo', sans-serif;
    }
    label {
      display: flex;
      align-items: center;
      gap: 8px;
      cursor: pointer;
      font-size: 15px;
      margin-bottom: 8px;
    }
    input[type="checkbox"] {
      width: 18px;
      height: 18px;
      cursor: pointer;
    }
    button {
      background: linear-gradient(145deg, #7e57c2, #673ab7);
      color: white;
      font-weight: bold;
      border: none;
      border-radius: 8px;
      padding: 12px 20px;
      font-size: 16px;
      cursor: pointer;
      transition: background 0.3s ease, transform 0.3s ease;
      margin: 5px 5px 5px 0;
    }
    button:hover {
      background: linear-gradient(145deg, #5e35b1, #4527a0);
      transform: scale(1.05);
    }
    .flex-row {
      display: flex;
      flex-wrap: wrap;
      gap: 10px;
      justify-content: flex-start;
      margin-bottom: 15px;
    }
    .section-title {
      background: #f3e5f5;
      border: 1px solid #ce93d8;
      border-radius: 10px;
      padding: 12px;
      margin-bottom: 15px;
      text-align: center;
      font-weight: 600;
      color: #6a1b9a;
    }
    .tabs {
      display: flex;
      gap: 10px;
      margin-bottom: 20px;
      justify-content: center;
      flex-wrap: wrap;
    }
    .tab {
      cursor: pointer;
      padding: 10px 25px;
      border-radius: 25px;
      background-color: #d1c4e9;
      font-weight: bold;
      color: #4a148c;
      user-select: none;
      transition: background-color 0.3s ease;
      flex-shrink: 0;
    }
    .tab.active {
      background-color: #7b1fa2;
      color: white;
      box-shadow: 0 0 8px rgba(123,31,162,0.8);
    }
    .output {
      background: #fff;
      border: 2px solid #7b1fa2;
      border-radius: 10px;
      padding: 15px;
      white-space: pre-wrap;
      min-height: 150px;
      font-family: monospace;
      font-size: 14px;
      direction: ltr;
      overflow-x: auto;
      margin-top: 10px;
    }
    @media (max-width: 700px) {
      .flex-row {
        flex-direction: column;
      }
      button {
        width: 100%;
      }
      .tabs {
        justify-content: center;
      }
      .tab {
        width: 100%;
        text-align: center;
      }
    }

    #toast {
      position: fixed;
      bottom: 30px;
      right: 30px;
      background: #7b1fa2;
      color: white;
      padding: 15px 25px;
      border-radius: 8px;
      box-shadow: 0 4px 12px rgba(123,31,162,0.7);
      font-weight: 600;
      font-size: 16px;
      opacity: 0;
      pointer-events: none;
      transition: opacity 0.5s ease;
      z-index: 9999;
    }
    #toast.show {
      opacity: 1;
      pointer-events: auto;
    }
  </style>
</head>
<body>

  <h1>���� ��� ������ ������ ����� CSS ���������</h1>

  <div class="container">
    <div class="section-title">���� ��� CSS</div>
    <textarea id="cssInput" placeholder="�� ��� CSS ���..."></textarea>

    <div class="section-title">������ ����� ��������</div>
    <div class="flex-row">
      <label><input type="checkbox" id="removeComments" checked /> ����� ���������</label>
      <label><input type="checkbox" id="minify" /> ��� ����</label>
      <label><input type="checkbox" id="space" /> ��� ������ ��� �������</label>
      <label><input type="checkbox" id="removeLastSemicolon" /> ����� ������� ������� ;</label>
      <label><input type="checkbox" id="convertPxToRem" /> ����� px ��� rem</label>
      <label><input type="checkbox" id="checkDuplicates" /> ��� ����� �����</label>
    </div>

    <div class="flex-row">
      <button onclick="processCSS()">��� ������ CSS</button>
      <button onclick="clearCSS()">��� �����</button>
      <button onclick="selectAllCSS()">����� ����</button>
      <button onclick="copyCSS()">��� �����</button>
      <button onclick="downloadCSS('css')">����� .css</button>
      <button onclick="downloadCSS('txt')">����� .txt</button>
    </div>

    <div class="section-title">�������</div>
    <textarea id="cssOutput" readonly placeholder="����� ������� ���..."></textarea>
  </div>

  <div class="container">
    <div class="section-title">����� ������</div>

    <div class="tabs">
      <div class="tab active" data-tab="generate">����� CSS</div>
      <div class="tab" data-tab="compare">������ CSS</div>
      <div class="tab" data-tab="performance">����� ������</div>
    </div>

    <div id="generate" class="tab-content">
      <textarea id="generateInput" placeholder="���� ������� (�����: background-color: red; font-size: 16px;)"></textarea>
      <button onclick="generateCSS()">����� CSS</button>
      <textarea id="generateOutput" readonly placeholder="���� ����� ��� CSS ���..."></textarea>
    </div>

    <div id="compare" class="tab-content" style="display:none;">
      <textarea id="compareInput1" placeholder="���� ��� CSS ����� ���..."></textarea>
      <textarea id="compareInput2" placeholder="���� ��� CSS ������ ���..."></textarea>
      <button onclick="compareCSS()">������ �������</button>
      <textarea id="compareOutput"
readonly placeholder="����� �������� ����� ���..."></textarea>
    </div>

    <div id="performance" class="tab-content" style="display:none;">
      <textarea id="performanceInput" placeholder="���� ��� CSS ������ ������..."></textarea>
      <button onclick="analyzePerformance()">����� ������</button>
      <textarea id="performanceOutput" readonly placeholder="����� ����� ������ ����� ���..."></textarea>
    </div>
  </div>

  <div id="toast"></div>

  
  
  <!-- ��� ����� �������� -->
<div class="container lang-block active" id="desc-ar">
  <div class="tool-container">
    <div class="tool-description">
      <h2>��� ������� ���� ����� CSS</h2>
      <p>
        1. �� ���� ��� CSS �� ����� ������ �������.<br>
        2. ���� �� �������� ������� ���:<br>
        - ����� ���������<br>
        - ����� ������� ��������<br>
        - ����� ������� �������<br>
        - ����� �������� �������� �������<br>
        - ����� px ��� rem<br>
        3. ���� ��� �� "����� �����" ������� ����� �������.<br>
        4. ����� ������ ������� �� ��� ����� �� ����� �� ����� ����.<br>
        5. ���� ����� ����� ������ ���: ����� CSS � ������ � ����� � ����� �����.<br>
        6. ����� ������� ��� ������� ���������� �������� ������� �� ������.
      </p>
    </div>
  </div>
</div>



  
  
  
  
  
  
  <script>
    // ��������� (Tabs) - ����� �������
    const tabs = document.querySelectorAll('.tab');
    const tabContents = document.querySelectorAll('.tab-content');

    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        tabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        const target = tab.dataset.tab;
        tabContents.forEach(tc => {
          tc.style.display = (tc.id === target) ? 'block' : 'none';
        });
      });
    });

    // ����� ����� ����� (toast)
    function showToast(message) {
      const toast = document.getElementById('toast');
      toast.textContent = message;
      toast.classList.add('show');
      setTimeout(() => {
        toast.classList.remove('show');
      }, 3000);
    }

    // ���� ������ ������ ��� CSS
    function processCSS() {
      let css = document.getElementById('cssInput').value;

      if (!css.trim()) {
        showToast('������ ����� ��� CSS �����!');
        return;
      }

      const removeComments = document.getElementById('removeComments').checked;
      const minify = document.getElementById('minify').checked;
      const space = document.getElementById('space').checked;
      const removeLastSemicolon = document.getElementById('removeLastSemicolon').checked;
      const convertPxToRem = document.getElementById('convertPxToRem').checked;
      const checkDuplicates = document.getElementById('checkDuplicates').checked;

      // ����� ���������
      if (removeComments) {
        css = css.replace(/\/\*[\s\S]*?\*\//g, '');
      }

      // ����� px ��� rem (��� ������ 16px = 1rem)
      if (convertPxToRem) {
        css = css.replace(/(\d*\.?\d+)px/g, (match, p1) => {
          const remValue = (parseFloat(p1) / 16).toFixed(4).replace(/\.?0+$/, '');
          return remValue + 'rem';
        });
      }

      // ��� CSS (����� ������ ����� ����� �����)
      if (minify) {
        // ����� ���� ������ ������� ������ ��������� �������
        css = css.replace(/\s+/g, ' ');
        // ����� �������� ��� ���� ������� �������� ���������
        css = css.replace(/\s*{\s*/g, '{').replace(/\s*}\s*/g, '}')
                 .replace(/\s*;\s*/g, ';').replace(/\s*:\s*/g, ':')
                 .replace(/\s*,\s*/g, ',');
      } else {
        // �� ���� ��� ����� �����ݡ ��� ����� ��� �������� �������� �������
        css = css.replace(/^\s+|\s+$/gm, '');
      }

      // ��� ����� ��� �������
      if (space) {
        css = css.replace(/,/g, ', ');
      }

      // ����� ������� ������� �� ��� ����� (��� ����� ������)
      if (removeLastSemicolon) {
        css = css.replace(/;(?=\s*})/g, '');
      }

      // ��� ������� ������� ���� �� ���� CSS
      if (checkDuplicates) {
        css = removeDuplicateProperties(css);
      }

      document.getElementById('cssOutput').value = css.trim();
      showToast('��� ������ ����� �����!');
    }

    // ���� ����� ������� ������� (���� �� ��� {})
    function removeDuplicateProperties(cssText) {
      return cssText.replace(/([^{]+){([^}]*)}/g, (match, selector, body) => {
        const props = body.split(';').map(p => p.trim()).filter(p => p.length > 0);
        const seen = new Set();
        const filteredProps = [];
        props.forEach(prop => {
          const propName = prop.split(':')[0].trim();
          if (!seen.has(propName)) {
            seen.add(propName);
            filteredProps.push(prop);
          }
        });
        return `${selector}{${filteredProps.join(';')}}`;
      });
    }

    // ��� ������
    function clearCSS() {
      document.getElementById('cssInput').value = '';
      document.getElementById('cssOutput').value = '';
      showToast('�� ��� ������');
    }

    // ����� ���� �� ���� �������
    function selectAllCSS() {
      const output = document.getElementById('cssOutput');
      output.select();
      output.setSelectionRange(0, output.value.length);
      showToast('�� ����� �� �����');
    }

    // ��� ����� �� ���� �������
    function copyCSS() {
      const output = document.getElementById('cssOutput');
      if (!output.value.trim()) {
        showToast('�� ���� ��� ���� ����');
        return;
      }
      output.select();
      output.setSelectionRange(0, output.value.length);
      navigator.clipboard.writeText(output.value).then(() => {
        showToast('�� ��� ����� ��� �������');
      }, () => {
        showToast('��� ��� ����� �����');
      });
    }

    // ����� ����� ����� css �� txt
    function downloadCSS(ext) {
      const css = document.getElementById('cssOutput').value.trim();
      if (!css) {
        showToast('�� ���� ��� ���� ������');
        return;
      }
      const blob = new Blob([css], { type: 'text/plain' });
      const a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = `compressed_css.${ext}`;
      a.click();
      URL.revokeObjectURL(a.href);
      showToast(`�� ����� ����� ����� .${ext}`);
    }

    // ����� ��� CSS �� ������� ������� (Tab ����� CSS)
    function generateCSS() {
      const input = document.getElementById('generateInput').value.trim();
      if (!input) {
        showToast('������ ����� ������� ������ CSS');
        return;
      }
      // ����� ����� ������ ������ ������� �����
      const cssCode = `selector {\n  ${input.replace(/;?\s*$/,';')}\n}`;
      document.getElementById('generateOutput').value = cssCode;
      showToast('�� ����� ��� CSS');
    }

    // ������ ���� CSS (Tab ������ CSS)
    function compareCSS() {
      const css1 = document.getElementById('compareInput1').value.trim();
      const css2 = document.getElementById('compareInput2').value.trim();

      if (!css1 || !css2) {
        showToast('������ ����� ��� ������� ��������');
        return;
      }

      const lines1 = css1.split('\n').map(l => l.trim()).filter(l => l);
      const lines2 = new Set(css2.split('\n').map(l => l.trim()).filter(l => l));

      // ����� ������ - ������ �������� �� ����� ���� ������ �� ������
      const diff = lines1.filter(line => !lines2.has(line));

      document.getElementById('compareOutput').value = diff.length
        ? diff.join('\n')
        : '�� ���� �������� ��� �������';
      showToast('��� ������ �������');
    }

    // ����� ���� ����� (Tab ����� ������)
    function analyzePerformance() {
      const css = document.getElementById('performanceInput').value.trim();
      if (!css) {
        showToast('������ ����� ��� CSS ������ ������');
        return;
      }

      // ���� ��� ����� (����� ����)
      const length = css.length;

      // ���� ��� ���������
      const comments = (css.match(/\/\*[\s\S]*?\*\//g) || []).length;

      // ���� ��� ����� CSS (��� ������� {})
      const rulesCount = (css.match(/{/g) || []).length;

      // ���� ����� ��� �������
      const avgRuleLength = rulesCount ? Math.round(length / rulesCount) : 0;

      const result = `
��� ������: ${length}
��� ���������: ${comments}
��� ����� CSS: ${rulesCount}
����� ��� ������� �������: ${avgRuleLength} ���
      `.trim();

      document.getElementById('performanceOutput').value = result;
      showToast('�� ����� ������');
    }
  </script>

</body>
