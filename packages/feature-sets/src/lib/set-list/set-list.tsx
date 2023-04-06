import styled from "styled-components";

import { useSetListQuery } from "@formation/data-access";

/* eslint-disable-next-line */
export interface SetListProps {}

const StyledSetList = styled.div`
	ul {
		list-style: none;
		margin: 0;
		font-family: sans-serif;
		width: 100%;
	}

	li {
		padding: 8px;
	}

	li:nth-child(2n) {
		background-color: #eee;
	}

	span.year {
		display: block;
		width: 20%;
	}
`;

export const SetList = (props: SetListProps) => {
	const { loading, error, data } = useSetListQuery();

	if (loading) return <p>Loading...</p>;
	if (error) return <p>Error :(</p>;

	return (
		<ul>
			{data.allSets.map(({ id, name, numParts, year }) => (
				<li key={id}>
					{year} - <strong>{name}</strong> ({numParts} parts)
				</li>
			))}
		</ul>
	);
};

export default SetList;
