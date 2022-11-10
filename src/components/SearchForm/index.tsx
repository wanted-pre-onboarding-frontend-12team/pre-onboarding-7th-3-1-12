import React, { useState, useEffect, useRef } from 'react';
import { getRelatedKeywords } from '../../api/api';
import useDebounce from '../../hooks/useDebounce';
import { sickInfo } from '../../type/type';
import RelatedSearchTerm from './RelatedSearchTerm';
import searchIcon from '../../assets/searchIcon.svg';

const SearchForm = () => {
	const [searchWord, setSearchWord] = useState<string>('');
	const [relatedWordList, setRelatedWordList] = useState<sickInfo[]>([]);
	const [focusIndex, setFocusIndex] = useState<number>(-1);
	const searchTermRef = useRef<HTMLUListElement>(null);
	const debounceWord = useDebounce(searchWord);

	const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		e.preventDefault();
		setSearchWord(e.target.value);
	};

	const onSearch = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
	};

	const onKeyDown = (e: React.KeyboardEvent<HTMLElement>) => {
		const { key } = e;

		switch (key) {
			case 'ArrowDown':
				setFocusIndex((prev) => (prev + 1) % relatedWordList.length);
				break;
			case 'ArrowUp':
				setFocusIndex((prev) => (prev - 1 + relatedWordList.length) % relatedWordList.length);
				break;
			case 'Escape':
				setFocusIndex(0);
				break;
			case 'Enter':
				// console.log(searchTermRef?.current?.children[focusIndex].innerText);
				break;
			default:
				setFocusIndex(0);
				break;
		}
	};

	useEffect(() => {
		if (debounceWord) {
			getRelatedKeywords(debounceWord).then((data: sickInfo[]) => {
				setRelatedWordList(data);
			});
		}
	}, [debounceWord]);

	return (
		<section className="bg-sky-200 flex-col justify-center items-center ">
			<form className="flex-col justify-center items-center" onSubmit={onSearch}>
				<h3 className="text-2xl flex-col justify-center items-center">국내 모든 임상시험 검색하고 온라인으로 참여하기</h3>
				<div className="flex-col justify-center items-center">
					<input placeholder="질환명을 입력해 주세요." onChange={onChange} onKeyDown={onKeyDown}></input>
					<button className="" type={'submit'}></button>
					<img className="bg-blue-500 rounded-full w-5px" src={searchIcon} />
				</div>
			</form>

			<div>{searchWord}</div>
			<div>최근 검색어</div>

			{debounceWord && relatedWordList.length > 0 ? (
				<RelatedSearchTerm data={relatedWordList} word={debounceWord} focuseIndex={focusIndex} ref={searchTermRef} />
			) : (
				<div>검색어 없음</div>
			)}
		</section>
	);
};

export default SearchForm;
