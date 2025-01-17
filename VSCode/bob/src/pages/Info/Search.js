import React, { useState } from 'react';
import '../../static/scss/Info/Sidebar.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';

const Search = () => {
    const [selectedSi, setSelectedSi] = useState('');
    const [selectedGu, setSelectedGu] = useState('');
    const [selectedOption, setSelectedOption] = useState(null);
    const [sortOption, setSortOption] = useState('');

    const handleSortClick = (option) => {
        setSortOption((prevOption) => (prevOption === option ? '' : option));
    };

    const guData = {
        서울시: ['도봉구', '노원구'],
        충청남도: ['천안시']
    };

    const dongData = {
        도봉구: ['방학동', '쌍문동'],
        노원구: ['중계동', '하계동'],
        천안시: ['불당동', '신불당동']
    };

    const siList = ['서울시', '충청남도'];

    return (
        <div className="search">
            <h3 style={{ textAlign: "left" }}>주유소 검색</h3>
            <div className="search-filter">
                <div className="filter">
                    <select onChange={(e) => setSelectedSi(e.target.value)}>
                        <option value="">시/도</option>
                        {siList.map((si) => (
                            <option key={si} value={si}>{si}</option>
                        ))}
                    </select>
                    <select onChange={(e) => setSelectedGu(e.target.value)}>
                        <option value="">군/구</option>
                        {guData[selectedSi]?.map((gu) => (
                            <option key={gu} value={gu}>{gu}</option>
                        ))}
                    </select>
                    <select>
                        <option value="">읍/면/동</option>
                        {dongData[selectedGu]?.map((dong) => (
                            <option key={dong} value={dong}>{dong}</option>
                        ))}
                    </select>
                </div><br />
                <div className="filter-options">
                    <input type="checkbox" className='repair' id='repair' />
                    <label htmlFor='repair' name='repair'>정비소</label>

                    <input type="checkbox" className='conv' id='conv' />
                    <label htmlFor='conv' name='conv'>편의점</label>

                    <input type='checkbox' className='24hour' id='24hour' />
                    <label htmlFor='24hour' name='24hour'>24시간</label>

                </div>
                <br />
                <button className="search-btn">조회하기</button>
            </div>
            <br/>
            <div className="sort-options">
            <FontAwesomeIcon icon={faBars} style={{ marginRight: '30px' }} />
            <button
                    className={`sort-btn ${sortOption === '낮은가격순' ? 'active' : ''}`}
                    onClick={() => handleSortClick('낮은가격순')}
                >
                    낮은가격순
                </button>
                <span style={{margin:"0px 10px"}}>  |  </span>
                <button
                    className={`sort-btn ${sortOption === '평점높은순' ? 'active' : ''}`}
                    onClick={() => handleSortClick('평점높은순')}
                >
                    평점높은순
                </button>                
            </div>
            <br/>
            <table className="index">
                <tr>
                    <td>기호</td>
                    <td>주유소명</td>
                    <td>가격</td>
                </tr>
            </table>
            <div className="price-list">
                <ul>
                    {Array.from({ length: 20 }, (_, i) => (
                        <li key={i}>
                            <span>{i + 1}</span>
                            <span>주유소 {i + 1}</span>
                            <span className="price">{1500 + i}원</span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Search;
