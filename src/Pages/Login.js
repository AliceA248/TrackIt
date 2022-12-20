import axios from 'axios';
import { useEffect, useState } from 'react';
import { ThreeDots } from 'react-loader-spinner';
import { useNavigate } from 'react-router-dom';
import LogoPrin from '../img/LogoPrin.png';
import { AiOutlineEyeInvisible, AiOutlineEye } from 'react-icons/ai';
import styled from 'styled-components';

export default function Login() {
	const navigate = useNavigate();
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [isClicked, setIsClicked] = useState(false);
	const [showed, setShowed] = useState(false);

	useEffect(() => {
		if (localStorage.length !== 0) {
			navigate('/hoje');
		}
	}, []);

	function login(e) {
		e.preventDefault();
		const URL =
			'https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/login';
		const body = { email, password };
		setIsClicked(true);

		const promise = axios.post(URL, body);
		promise.then((res) => {
			setIsClicked(false);
			localStorage.setItem('Image', res.data.image);
			localStorage.setItem('Token', res.data.token);
			navigate('/hoje');
		});
		promise.catch((err) => {
			alert(err.response.data.message);
			setIsClicked(false);
		});
	}

	return (
		<ContainerLogin onSubmit={login}>
			<img src={LogoPrin} alt="" />
			<form>
				<InputLogin
					data-test="email-input"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					type="email"
					placeholder="email"
					required
					disabled={isClicked}
				/>
				<div>
					<InputLogin
						data-test="password-input"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						type={showed ? 'text' : 'password'}
						placeholder="senha"
						required
						disabled={isClicked}
					/>
					{showed ? (
						<AiOutlineEye onClick={() => setShowed(!showed)} />
					) : (
						<AiOutlineEyeInvisible onClick={() => setShowed(!showed)} />
					)}
				</div>
				<LoginButton
					data-test="password-input"
					clicked={isClicked}
					type="submit"
					disabled={isClicked}
				>
					{isClicked ? <ThreeDots color="#FFFFFF" /> : 'Entrar'}
				</LoginButton>
			</form>
			<p data-test="signup-link" onClick={() => navigate('/cadastro')}>
				Não tem uma conta? Cadastre-se!
			</p>
		</ContainerLogin>
	);
}

const ContainerLogin = styled.div`
	background-color: #ffffff;
	width: 100vw;
	height: 100vh;
	display: flex;
	flex-direction: column;
	align-items: center;
	img {
		margin-top: 68px;
		margin-bottom: 30px;
	}
	form {
		display: flex;
		flex-direction: column;
		div {
			position: relative;
			svg {
				position: absolute;
				top: 10px;
				right: 10px;
				font-size: 25px;
				color: #d5d5d5;
			}
		}
	}
	p {
		font-family: 'Lexend Deca', sans-serif;
		margin-top: 25px;
		font-size: 14px;
		color: #52b6ff;
		text-decoration: underline;
		cursor: pointer;
	}
`;

const InputLogin = styled.input`
	width: 303px;
	height: 45px;
	border: 2px solid #d5d5d5;
	border-radius: 5px;
	margin-bottom: 6px;
	outline: none;
	font-family: 'Lexend Deca', sans-serif;
	font-size: 20px;
	padding-left: 11px;
	&::placeholder {
		color: #dbdbdb;
	}
`;

const LoginButton = styled.button`
	height: 45px;
	border: none;
	border-radius: 5px;
	background-color: #52b6ff;
	color: #ffffff;
	opacity: ${(props) => (props.clicked ? '0.7' : '1')};
	font-family: 'Lexend Deca', sans-serif;
	font-size: 21px;
	display: flex;
	align-items: center;
	justify-content: center;
	cursor: pointer;
`;

export { ContainerLogin, InputLogin };