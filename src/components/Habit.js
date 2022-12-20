import styled from 'styled-components';
import axios from 'axios';
import trash from '../img/Trash.png';

const weekdays = [
	'Domingo',
	'Segunda-feira',
	'Terça-feira',
	'Quarta-feira',
	'Quinta-feira',
	'Sexta-feira',
	'Sábado',
];

export default function Habits({ habit, habitDelete, setHabitDelete }) {
	const token = localStorage.getItem('Token');

	function deleteHabit() {
		const URL = `https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${habit.id}`;
		const config = {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		};

		if (window.confirm('Você tem certeza que quer apagar esse hábito?')) {
			const promise = axios.delete(URL, config);
			promise.then(() => setHabitDelete(!habitDelete));
		}
	}

	return (
		<CreatedHabitsContainer data-test="habit-container">
			<p data-test="habit-name">{habit.name}</p>
			<div>
				{weekdays.map((w, index) =>
					habit.days.includes(index) ? (
						<DaysButton data-test="habit-day" key={index} selected={true}>
							{w[0]}
						</DaysButton>
					) : (
						<DaysButton data-test="habit-day" key={index} selected={false}>
							{w[0]}
						</DaysButton>
					)
				)}
			</div>
			<img
				data-test="habit-delete-btn"
				src={trash}
				alt=""
				onClick={deleteHabit}
			/>
		</CreatedHabitsContainer>
	);
}

const CreatedHabitsContainer = styled.div`
	width: 340px;
	height: 91px;
	background-color: #ffffff;
	margin-top: 10px;
	border-radius: 5px;
	position: relative;
	p {
		font-family: 'Lexend Deca', sans-serif;
		font-size: 20px;
		margin-left: 15px;
		padding-top: 13px;
		color: #666666;
	}
	div {
		margin-left: 14px;
		margin-top: 8px;
	}
	img {
		position: absolute;
		top: 11px;
		right: 10px;
		cursor: pointer;
	}
`;

const DaysButton = styled.button`
	font-family: 'Lexend Deca', sans-serif;
	margin-right: 4px;
	width: 30px;
	height: 30px;
	border: 1px solid #d5d5d5;
	border-radius: 5px;
	background-color: ${(props) =>
		props.selected === true ? '#CFCFCF' : '#FFFFFF'};
	color: ${(props) => (props.selected === true ? '#FFFFFF' : '#DBDBDB')};
	font-size: 20px;
`;