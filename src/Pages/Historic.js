import styled from 'styled-components';
import Header from '../components/Header';
import FooterMenu from '../components/Menu';

export default function Historico() {
	return (
		<HistoricContainer>
			<Header />
			<h1>Histórico</h1>
			<p>Em breve você poderá ver o histórico dos seus hábitos aqui!</p>
			<FooterMenu />
		</HistoricContainer>
	);
}

const HistoricContainer = styled.div`
	width: 100vw;
	height: 100vh;
	padding-left: 17px;
	> h1 {
		padding-top: 98px;
		font-size: 23px;
		font-family: 'Lexend Deca', sans-serif;
		color: #126ba5;
	}
	> p {
		font-family: 'Lexend Deca', sans-serif;
		font-size: 18px;
		color: #666666;
		margin-top: 17px;
		line-height: 22px;
	}
`;