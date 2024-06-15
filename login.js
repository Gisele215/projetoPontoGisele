document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('loginForm').addEventListener('submit', function(event) {
        event.preventDefault();
        const email = document.getElementById('email').value;
        const password = document.getElementById('senha').value;

        firebase.auth().signInWithEmailAndPassword(email, password)
            .then((userCredential) => {
                // Login bem-sucedido
                window.location.href = 'cadastro.html'; // Redireciona para a página de cadastro de alunos
            })
            .catch((error) => {
                console.error('Erro ao fazer login: ', error.message);
                alert('Falha ao entrar: ' + error.message);
            });
    });
});



// Login de administrador
document.getElementById('adminLoginForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const adminEmail = document.getElementById('adminEmail').value;
    const adminSenha = document.getElementById('adminSenha').value;

    // Implemente a lógica de autenticação para administradores usando Firebase Auth
    firebase.auth().signInWithEmailAndPassword(adminEmail, adminSenha)
        .then((userCredential) => {
            // Login bem-sucedido para administrador
            window.location.href = 'administrador.html'; // Redireciona para a página de administração
        })
        .catch((error) => {
            console.error('Erro ao fazer login como administrador: ', error.message);
            alert('Falha ao entrar como administrador: ' + error.message);
        });
});

