import updateLocale from 'dayjs/plugin/updateLocale';
import 'dayjs/locale/pt-br';
import dayjs from 'dayjs';
import Today from '../components/Today';
import { useContext, useEffect } from 'react';
import styled from 'styled-components';
import FooterMenu from '../components/Menu';
import Header from '../components/Header';
import React, { createContext, useState } from 'react';
import axios from 'axios';
import { AuthContext } from '../AuthContext';

const weekdays = [
	'Domingo',
	'Segunda-feira',
	'Terça-feira',
	'Quarta-feira',
	'Quinta-feira',
	'Sexta-feira',
	'Sábado',
];


export default function Hoje() {
	dayjs.extend(updateLocale);
	dayjs.updateLocale('pt-br', {
		weekdays,
	});
	const today = dayjs().locale('pt-br').format('dddd, DD/MM');
	const token = localStorage.getItem('Token');
	const { habitsToday, setHabitsToday, refresh } = useContext(AuthContext);
	const totalHabits = habitsToday.length;
	const completedHabits = habitsToday.filter((h) => h.done).length;

	useEffect(() => {
		const URL =
			'https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/today';
		const config = {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		};

		const promise = axios.get(URL, config);
		promise.then((res) => {
			setHabitsToday(res.data);
		});
	}, [refresh]);

	return (
		<Container completedHabits={completedHabits}>
			<Header />
			<h1 data-test="today">{today}</h1>
			{completedHabits === 0 ? (
				<p data-test="today-counter">Nenhum hábito concluído ainda</p>
			) : (
				<p data-test="today-counter">{`${Math.round(
					(completedHabits / totalHabits) * 100
				)}% dos hábitos concluídos`}</p>
			)}
			{habitsToday.map((h) => (
				<Today key={h.id} habit={h} />
			))}
			<footer></footer>
			<FooterMenu />
		</Container>
	);
}

const Container = styled.div`
	background-color: #f2f2f2;
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
		color: ${(props) => (props.completedHabits !== 0 ? '#8FC549' : '#BABABA')};
		margin-top: 5px;
		margin-bottom: 28px;
	}
	footer {
		height: 120px;
	}
`;