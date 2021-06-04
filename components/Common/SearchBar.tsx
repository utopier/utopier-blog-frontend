import styled from '@emotion/styled';
import { useRouter } from 'next/router';
// import { useDispatch, useSelector } from 'react-redux';
import React from 'react';

// import { LOAD_POSTS_REQUEST, LOAD_TAGS_REQUEST } from '../../store/redux/reducers/post';
// import { LOAD_USERS_REQUEST } from '../../store/redux/reducers/user';

import useInput from '../../hooks/useInput'

const SearchBarWrapper = styled.div`
	display: flex;
	width: 100%;
	justify-content: center;
	align-items: center;
	position: relative;
	cursor: none;
	padding: 0 5px;
	input {
		height: 50%;
		width: 100%;
	}
	img {
		height: 45%;
	}
	.search--icon {
		position: absolute;
		top: 10px;
		right: 2px;
	}
	@media (max-width: 800px) {
		.search--icon {
			right: 0;
		}
	}
	@media (max-width: 500px) {
		.search--icon {
			right: 0;
		}
	}
`;

const SearchBar = ({ placeholder, id }) => {
	// const dispatch = useDispatch();
	const router = useRouter();
	// const route = router.route.slice(1).toUpperCase();
	console.log(router.pathname);
	const [searchTerm, onChangeSearchTerm, setSearchTerm] = useInput('');

	const onKeyPressSearchBar = (e) => {
        console.log('onKeyPressSearchBar');
		if(e.key ==='Enter'){
			if(e.target.id === 'subnav_searchbar' && router.pathname === '/tags'){
				router.push(`/tags?searchTerm=${searchTerm}`);
				setSearchTerm('');	
			} else if(e.target.id === 'subnav_searchbar' && router.pathname === '/users'){
				router.push(`/users?searchTerm=${searchTerm}`);
				setSearchTerm('');			
			} 
			else if(e.target.id === 'main-search-bar') {
				router.push(`/posts?searchTerm=${searchTerm}`);
				setSearchTerm('');	
			}
		}
		// if (e.target.id === 'main-search-bar') {
		// 	router.push('/posts');
		// }
		// if (e.key === 'Enter') {
		// 	dispatch({
		// 		type:
		// 			e.target.id === 'main-search-bar'
		// 				? LOAD_POSTS_REQUEST
		// 				: route === 'TAGS'
		// 				? LOAD_TAGS_REQUEST
		// 				: LOAD_USERS_REQUEST,
		// 		data: { searchQuery },
		// 	});
		// 	setSearchQuery(0);
		// }
	};

	return (
		<SearchBarWrapper>
			<input
				id={id}
				type="text"
				placeholder={placeholder || 'Search...'}
				value={searchTerm}
				onChange={onChangeSearchTerm}
				onKeyPress={onKeyPressSearchBar}
			/>
			<img className="search--icon" src="/icons/search.svg" width="35" height="35" />
		</SearchBarWrapper>
	);
};

export default SearchBar;
