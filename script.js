document.addEventListener('DOMContentLoaded', () => {

    // 1. AJUSTE DE TAMANHO DA FONTE
    const articleText = document.getElementById('article-text');
    const btnIncrease = document.getElementById('btn-increase');
    const btnDecrease = document.getElementById('btn-decrease');
    let currentFontSize = 16;

    btnIncrease.addEventListener('click', () => {
        if (currentFontSize < 22) {
            currentFontSize += 2;
            articleText.style.fontSize = `${currentFontSize}px`;
        }
    });

    btnDecrease.addEventListener('click', () => {
        if (currentFontSize > 12) {
            currentFontSize -= 2;
            articleText.style.fontSize = `${currentFontSize}px`;
        }
    });

    // 2. SIMULADOR DA MÁQUINA DIFERENCIAL
    // Fórmula polinomial simples para demonstração: f(x) = x^2 + x + 41 (Fórmula de Euler)
    const inputX = document.getElementById('input-x');
    const btnCalcular = document.getElementById('btn-calcular');
    const simOutput = document.getElementById('sim-output');

    btnCalcular.addEventListener('click', () => {
        const x = parseInt(inputX.value) || 0;
        const resultado = (x * x) + x + 41;
        simOutput.innerHTML = `Resultado para X = ${x}: <strong>${resultado}</strong>`;
    });

    // 3. ABAS DA LINHA DO TEMPO
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    tabButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetTab = btn.getAttribute('data-tab');

            tabButtons.forEach(b => b.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));

            btn.classList.add('active');
            document.getElementById(targetTab).classList.add('active');
        });
    });

    // 4. ENQUETE INTERATIVA
    const pollButtons = document.querySelectorAll('.poll-btn');
    const pollResults = document.getElementById('poll-results');
    const countSim = document.getElementById('count-sim');
    const countNao = document.getElementById('count-nao');

    pollButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const vote = btn.getAttribute('data-vote');
            
            // Simulação de percentuais de votação
            if (vote === 'sim') {
                countSim.innerText = '78%';
                countNao.innerText = '22%';
            } else {
                countSim.innerText = '77%';
                countNao.innerText = '23%';
            }

            document.querySelector('.poll-options').style.display = 'none';
            pollResults.style.display = 'block';
        });
    });

    // 5. SEÇÃO DE COMENTÁRIOS DINÂMICA
    const btnSubmitComment = document.getElementById('btn-submit-comment');
    const authorInput = document.getElementById('author-input');
    const commentInput = document.getElementById('comment-input');
    const commentsContainer = document.getElementById('comments-container');
    const commentsCount = document.getElementById('comments-count');

    let totalComments = 2;

    btnSubmitComment.addEventListener('click', () => {
        const author = authorInput.value.trim();
        const text = commentInput.value.trim();

        if (author === '' || text === '') {
            alert('Por favor, preencha o seu nome e o comentário.');
            return;
        }

        // Criar elemento de comentário
        const newComment = document.createElement('div');
        newComment.classList.add('comment-item');
        newComment.innerHTML = `
            <div class="comment-header">
                <strong>${escapeHtml(author)}</strong>
                <time>Agora mesmo</time>
            </div>
            <p class="comment-text">${escapeHtml(text)}</p>
            <div class="comment-actions">
                <button class="like-btn">Gostei (<span class="like-count">0</span>)</button>
            </div>
        `;

        commentsContainer.prepend(newComment);

        // Atualizar contador
        totalComments++;
        commentsCount.innerText = totalComments;

        // Limpar campos
        authorInput.value = '';
        commentInput.value = '';

        // Adicionar evento ao botão de curtir do novo comentário
        attachLikeEvent(newComment.querySelector('.like-btn'));
    });

    // Lógica para curtir comentários
    function attachLikeEvent(button) {
        button.addEventListener('click', function() {
            const countSpan = this.querySelector('.like-count');
            let currentLikes = parseInt(countSpan.innerText);
            countSpan.innerText = currentLikes + 1;
            this.disabled = true;
            this.style.opacity = '0.6';
        });
    }

    document.querySelectorAll('.like-btn').forEach(btn => attachLikeEvent(btn));

    // Função de segurança simples para evitar XSS ao inserir texto do usuário
    function escapeHtml(text) {
        return text
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
    }
});