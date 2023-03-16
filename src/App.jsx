import { login } from './utils';
import './index.css';
import { useState } from 'react';

// Instruções:
// * Você tem um formulário de login INCOMPLETO
// * Não é permitido adicionar novos elementos HTML
// * Não é permitido usar refs
//
// Tarefas:
// todo - O botão de login deve disparar a função login(), importada no topo deste arquivo, e passar os dados necessários.
// todo - Desabilite o botão de Login caso o e-mail esteja em branco OU a senha for menor que 6 dígitos.
// todo - Desabilite o botão de Login equanto você está executando o login.
// todo - Mostre uma mensagem de erro de login() caso o Login falhe. A mensagem deve ser limpa a cada nova tentativa de Login.
// todo - Mostre um alerta caso o login seja efetuado com sucesso (javascript alert). Investigue a função login() para entender como ter sucesso na requisição.

export default function LoginForm() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [erro, setError] = useState(null)
  const [isRequesting, setIsRequesting] = useState(false)


  const hangleSubmit = () => {

    //limpando a div de erro a cada tentativa de Login
    setError(null);
    setIsRequesting(true);

    let values = {email: email, password: password}

    login(values)
      .then( () => {
        alert("Login efetuado com sucesso!")
      })
      
      .catch( (error) => {
          setError(error)
      })
      /*
      finally:  ele é executado independente de falha ou sucesso, esse método é o lugar certo para desabilitar o "isRequesting"
      pois independente de nosso retorno queremos reabilitar o botão de Login pora tentar refazer o login novamente
      */
      .finally(
        () => {
          setIsRequesting(false)
        }
      )
  }

  return (
    <div className='wrapper'>
      <div className='login-form'>
        <h1>Login Form 🐞</h1>
        {
        /*aqui criamos uma div condicional, se existir o erro nós vamos criar uma div com a mensagem de erro, 
        ".message" é o atributo que eles deram para o erro no arquivo utils, conseguindo acessar a mensagem exata de erro que eles configuraram*/
        }
        {erro && <div className='errorMessage'>{erro.message}</div>}
        <div className='row'>
          <label htmlFor={'email'}>Email</label>
          <input value={email} id={'email'} type={'email'} autoComplete='off' onChange={e => setEmail(e.target.value)} />
        </div>
        <div className='row'>
          <label htmlFor={'password'}>Password</label>
          <input value={password} id={'password'} type={'password'} onChange={e => setPassword(e.target.value)} />
        </div>

        <div className='button'>
          <button type='submit' disabled={email === '' || password.length < 6 || isRequesting}  onClick={hangleSubmit}>
            Login
          </button>
        </div>
      </div>
    </div>
  );
}
