

                      //APP DO FUNCIONARIO
// Configure o Firebase com suas credenciais
const firebaseConfig = {
    apiKey:"AIzaSyC1_u_I_eLTctU6zaf_YAUmhjD6SxsZM7w",
    authDomain: "testegisele-d5bbb.firebaseapp.com",
    databaseURL:"https://testegisele-d5bbb-default-rtdb.firebaseio.com/",
    projectId: "testegisele",
    storageBucket: "gs://testegisele-d5bbb.appspot.com",
    messagingSenderId: "594202472296",
    appId: "1:594202472296:web:715d278177f9ccb71330dd"
  };


   firebase.initializeApp(firebaseConfig); // Inicialize o Firebase
   const database = firebase.database(); // Inicialize o banco de dados
   const storage = firebase.storage(); // Inicialize o storage


function enviarDadosParaFirebaseFuncionario() {
    const nome = document.getElementById('nome').value;
    const area = document.getElementById('area').value;
    const endereco = document.getElementById('endereco').value;
    const telefone = document.getElementById('telefone').value;
    const imagem = document.getElementById('imagem').files[0]; // Obtém o arquivo de imagem

    if (imagem) {
        const storageRef = storage.ref('imagens/' + imagem.name);
        storageRef.put(imagem).then(snapshot => {
            snapshot.ref.getDownloadURL().then(downloadURL => {
                const dados = {
                    nome: nome,
                    area: area,
                    endereco: endereco,
                    telefone: telefone,
                    imagemURL: downloadURL // Salva a URL da imagem
                };
                database.ref('funcionarios').push(dados)
                .then(() => {
                    alert('Dados do usúario enviados com sucesso!');
                    document.getElementById('nome').value = '';
                    document.getElementById('area').value = '';
                    document.getElementById('endereco').value = '';
                    document.getElementById('telefone').value = '';
                    document.getElementById('imagem').value = '';
                })
                .catch(error => {
                    console.error('Erro ao enviar os dados para o Realtime Database: ', error);
                    alert('Erro ao enviar os dados. Por favor, tente novamente.');
                });
            });
        }).catch(error => {
            console.error('Erro ao fazer upload da imagem: ', error);
            alert('Erro ao enviar a imagem. Por favor, tente novamente.');
        });
    } else {
        alert('Por favor, selecione uma imagem.');
    }
}

    
   function consultarPontoPorNome() {
    const nome = document.getElementById('nomeConsulta').value.trim();
    const funcionariosRef = database.ref('funcionarios');
    funcionariosRef.orderByChild('nome').equalTo(nome).once('value', snapshot => {
    const data = snapshot.val();
    const lista = document.getElementById('listaFuncionarios');
    lista.innerHTML = ''; // Limpar lista anterior

    if (data) {
    Object.keys(data).forEach(key => {
    const funcionario = data[key];
    const item = document.createElement('li');
    item.innerHTML = `<p>Nome: ${funcionario.nome}, <p>Aréa em que trabalha: ${funcionario.area}, <p>Endereço: 
   ${funcionario.endereco}, <p>Telefone: ${funcionario.telefone}", Imagem: <p><img src="${funcionario.imagemURL}" alt="Imagem do funcionario" 
   style="width:100px; height:auto;">`;
    lista.appendChild(item);
    });
    } else {
    lista.innerHTML = '<li>Nenhum funcionario encontrado com esse nome.</li>';
    }
    }).catch(error => {
    console.error('Erro ao buscar funcionarios: ', error);
    });
   }






                            //APP DO PONTO DE REGISTRO
function enviarDadosParaFirebasePonto() {
    const hora = document.getElementById('hora').value;
    const data = document.getElementById('data').value;
    const localizacao = document.getElementById('localizacao').value;
    const imagemPonto = document.getElementById('imagemPonto').files[0]; // Obtém o arquivo de imagem

    if (imagemPonto) {
        const storageRef = storage.ref('imagens/' + imagemPonto.name);
        storageRef.put(imagemPonto).then(snapshot => {
            snapshot.ref.getDownloadURL().then(downloadURL => {
                const dados = {
                    hora: hora,
                    data: data,
                    localizacao: localizacao,
                    imagemURL2: downloadURL // Salva a URL da imagem
                };
                database.ref('registroPontos').push(dados)
                .then(() => {
                    alert('Registro enviado com sucesso!');
                    document.getElementById('hora').value = '';
                    document.getElementById('data').value = '';
                    document.getElementById('localizacao').value = '';
                    document.getElementById('imagemPonto').value = '';
                })
                .catch(error => {
                    console.error('Erro ao enviar o registro para o Realtime Database: ', error);
                    alert('Erro ao enviar os dados. Por favor, tente novamente.');
                });
            });
        }).catch(error => {
            console.error('Erro ao fazer upload da imagem: ', error);
            alert('Erro ao enviar a imagem. Por favor, tente novamente.');
        });
    } else {
        alert('Por favor, selecione uma imagem.');
    }
}

   function consultarPontoPorData() {
    const data = document.getElementById('dataConsulta').value.trim();
    const registroPontoRef = database.ref('registroPontos');
    registroPontoRef.orderByChild('data').equalTo(data).once('value', snapshot => {
    const data = snapshot.val();
    const lista = document.getElementById('listaPontos');
    lista.innerHTML = ''; // Limpar lista anterior

    if (data) {
    Object.keys(data).forEach(key => {
    const registroPonto = data[key];
    const item = document.createElement('li');
    item.innerHTML = `Hora: ${registroPonto.hora}, Data: ${registroPonto.data}, Localização: 
   ${registroPonto.localizacao}, Imagem: <p><img src="${registroPonto.imagemURL2}" alt="Imagem do ponto" 
   style="width:100px; height:auto;">`;
    lista.appendChild(item);
    });
    } else {
    lista.innerHTML = '<li>Nenhum Registro de ponto encontrado com esse nome.</li>';
    }
    }).catch(error => {
    console.error('Erro ao buscar registro de pontos: ', error);
    });
   }



   //ADMINISTRAÇÃO
   // Função para listar funcionários na tabela de Funcionários
function listarFuncionarios() {
    const funcionariosRef = database.ref('funcionarios');

    funcionariosRef.once('value')
        .then(snapshot => {
            const listaFuncionarios = document.getElementById('listaUsuarios');
            listaFuncionarios.innerHTML = ''; // Limpar conteúdo anterior da lista

            if (snapshot.exists()) {
                snapshot.forEach(funcionarioSnap => {
                    const funcionario = funcionarioSnap.val();
                    const row = document.createElement('tr');
                    row.innerHTML = `
                        <td>${funcionario.nome}</td>
                        <td>${funcionario.area}</td>
                        <td>${funcionario.endereco}</td>
                        <td>${funcionario.telefone}</td>
                        <td><img src="${funcionario.imagemURL}" alt="Imagem do funcionário" style="width:100px; height:auto;"></td>
                    `;
                    listaFuncionarios.appendChild(row);
                });
            } else {
                listaFuncionarios.innerHTML += '<tr><td colspan="5">Nenhum funcionário cadastrado.</td></tr>';
            }
        })
        .catch(error => {
            console.error('Erro ao buscar funcionários: ', error);
        });
}

// Função para listar registros de ponto na tabela de Registros de Ponto
function listarRegistrosPonto() {
    const registrosRef = database.ref('registroPontos');

    registrosRef.once('value')
        .then(snapshot => {
            const listaRegistros = document.getElementById('listaRegistros');
            listaRegistros.innerHTML = ''; // Limpar conteúdo anterior da lista

            if (snapshot.exists()) {
                snapshot.forEach(registroSnap => {
                    const registro = registroSnap.val();
                    const row = document.createElement('tr');
                    row.innerHTML = `
                        <td>${registro.hora}</td>
                        <td>${registro.data}</td>
                        <td>${registro.localizacao}</td>
                        <td><img src="${registro.imagemURL2}" alt="Imagem do registro de ponto" style="width:100px; height:auto;"></td>
                    `;
                    listaRegistros.appendChild(row);
                });
            } else {
                listaRegistros.innerHTML += '<tr><td colspan="5">Nenhum registro de ponto encontrado.</td></tr>';
            }
        })
        .catch(error => {
            console.error('Erro ao buscar registros de ponto: ', error);
        });
}

// Chame as funções para listar funcionários e registros de ponto ao carregar a página
listarFuncionarios();
listarRegistrosPonto();
