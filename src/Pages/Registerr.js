import axios from 'axios';
import { useState } from 'react';
import { ThreeDots } from 'react-loader-spinner';
import { useNavigate } from 'react-router-dom';
import { ContainerLogin, InputLogin, LoginButton } from './Login';
import styled from 'styled-components';
import LogoPrin from '../img/LogoPrin.png';
import { AiOutlineEyeInvisible, AiOutlineEye } from 'react-icons/ai';

export default function Registro() {
	const navigate = useNavigate();
	const [email, setEmail] = useState('');
	const [name, setName] = useState('');
	const [image, setImage] = useState('');
	const [password, setPassword] = useState('');
	const [isRegister, setIsRegister] = useState(false);
	const [showed, setShowed] = useState(false);

	function register(e) {
		e.preventDefault();
		setIsRegister(true);

		const URL =
			'https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/sign-up';
		const body = { email, name, image, password };

		const promise = axios.post(URL, body);
		promise.then(() => {
			navigate('/');
			setIsRegister(false);
		});
		promise.catch((err) => {
			alert(err.response.data);
			setIsRegister(false);
		});
	}

	return (
		<ContainerLogin>
			<img src={LogoPrin} alt="" />
			<form onSubmit={register}>
				<InputLogin
					data-test="email-input"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					type="email"
					placeholder="email"
					required
					disabled={isRegister}
				/>
				<div>
					<InputLogin
						data-test="password-input"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						type={showed ? 'text' : 'password'}
						placeholder="senha"
						required
						disabled={isRegister}
					/>
					{showed ? (
						<AiOutlineEye onClick={() => setShowed(!showed)} />
					) : (
						<AiOutlineEyeInvisible onClick={() => setShowed(!showed)} />
					)}
				</div>
				<InputLogin
					data-test="user-name-input"
					value={name}
					onChange={(e) => setName(e.target.value)}
					type="text"
					placeholder="nome"
					required
					disabled={isRegister}
				/>
				<InputLogin
					data-test="user-image-input"
					value={image}
					onChange={(e) => setImage(e.target.value)}
					type="url"
					placeholder="foto"
					required
					disabled={isRegister}
				/>
				<RegisterButton
					data-test="signup-btn"
					register={isRegister}
					type="submit"
					disabled={isRegister}
				>
					{isRegister ? <ThreeDots color="#FFFFFF" /> : 'Cadastrar'}
				</RegisterButton>
			</form>
			<p data-test="login-link" onClick={() => navigate('/')}>
				Já tem uma conta? Faça login!
			</p>
		</ContainerLogin>
	);
}

const RegisterButton = styled.button`
	height: 45px;
	border: none;
	border-radius: 5px;
	background-color: #52b6ff;
	opacity: ${(props) => (props.register ? '0.7' : '1')};
	color: #ffffff;
	font-family: 'Lexend Deca', sans-serif;
	font-size: 21px;
	display: flex;
	align-items: center;
	justify-content: center;
	cursor: pointer;
`;