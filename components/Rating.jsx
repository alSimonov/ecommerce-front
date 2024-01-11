import React, { useState } from "react";
import { FaStar } from "react-icons/fa";
import styled from "styled-components";


const Container = styled.div`
	display: flex;
	justify-content: left;
	align-items: center;
	min-height: 4vh;
	font-size: 18px;
`
const Radio = styled.input`
	display: none;
`
const Rating = styled.div`
	cursor: pointer;
`


const Rate = () => {
	const [rate, setRate] = useState(0);
  const [displayed, setDisplayed] = useState(false);

	return (
		<Container>
			{[...Array(5)].map((item, index) => {
				const givenRating = index + 1;
				return (
					<label key={index}>
						<Radio
							type="radio"
							value={givenRating}
							onClick={() => {
								setRate(givenRating);
							}}
							// onMouseEnter={() => setDisplayed(true)}
							// onMouseLeave={() => setDisplayed(false)}
						/>
						<Rating>
							<FaStar
								color={
									givenRating < rate || givenRating === rate
										? "000"
										: "rgb(192,192,192)"
								}
							/>
						</Rating>
						
					</label>
				);
			})}
		</Container>
	);
};

export default Rate;
