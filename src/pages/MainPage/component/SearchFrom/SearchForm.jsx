import React from 'react';
import './SearchForm.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SearchForm = () => {
    const [inputs, setInputs] = useState({
        depart:'',
        arrive:'',
        departLine: '',
        arriveLine: '',
    });
    const {depart, arrive, departLine, arriveLine} = inputs;
    const navigate = useNavigate();

    const onChange = (e) => {
        const { name, value } = e.target;
        setInputs({...inputs, [name]: value});
    }

    const searchSubway = (e) => {
        e.preventDefault();
        //inputs 객체의 각 키와 값을 반복하여 URL 쿼리 문자열로 구성
        const queryStringParams = Object.keys(inputs).map(key => `${encodeURIComponent(key)}=${encodeURIComponent(inputs[key])}`).join('&');
        navigate(`/arrival-result?${queryStringParams}`);
    }

  return (
    <div className='main-search-form'>
      <h1>FIND YOUR SUB-WAY</h1>
      <span>출발/도착역과 호선 정보를 입력해주세요.</span>
      <form action='' className='search-input' onSubmit={searchSubway}>
        <div>
          <input
            type='text'
            placeholder='출발역을 입력해주세요.'
            required
            name='depart'
            value={depart}
            onChange={onChange}
          />
          <input
            type='text'
            placeholder='ex)2호선'
            required
            name='departLine'
            value={departLine}
            onChange={onChange}
          />
        </div>
        <div>
          <input
            type='text'
            placeholder='도착역을 입력해주세요.'
            required
            name='arrive'
            value={arrive}
            onChange={onChange}
          />
          <input
            type='text'
            placeholder='ex)2호선'
            required
            name='arriveLine'
            value={arriveLine}
            onChange={onChange}
          />
        </div>
        <button type='submit'>길찾기</button>
      </form>
    </div>
  );
}

export default SearchForm