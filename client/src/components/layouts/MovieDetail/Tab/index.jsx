import React from 'react';
import PropTypes from 'prop-types';
import { Tabs } from 'react-bootstrap';
import './index.scss';
import { changeVN } from 'configs/movie.genre.vn';
Tab.propTypes = {
  data: PropTypes.object,
};

function Tab(props) {
  const { data } = props;
  if (!data) {
    return <div></div>;
  }
  return (
    <div className='movie-detail_tab'>
      <Tabs defaultActiveKey='overview' id='uncontrolled-tab-example'>
        <Tab eventKey='overview' title='OVERVIEW'>
          <div className='overview'>
            <div className='title'>
              <b>Tên phim:</b> {data.title}
            </div>
            <div className='duration'>
              <b>Thời lượng: </b> {data.duration} phút
            </div>
            <div className='description'>
              <b>Thông tin:</b> {data.description}
            </div>
            <div className='tags'>
              <b>Thể loại :</b> {changeVN(data.tags).join(' / ')}
            </div>
            <div className='director'>
              <b>Đạo diễn:</b> {data.director}
            </div>
            <div className='nation'>
              <b>Quốc gia:</b> {data.nation}
            </div>
            <div className='release_date'>
              <b>Ngày phát hành:</b> {data.release_date}
            </div>
          </div>
        </Tab>
        <Tab eventKey='episodes' title='EPISODES'>
          “I'm selfish, impatient and a little insecure. I make mistakes, I am
          out of control and at times hard to handle. But if you can't handle me
          at my worst, then you sure as hell don't deserve me at my best.”
        </Tab>
        <Tab eventKey='morelikethis' title='MORE LIKE THIS'>
          “I'm selfish, impatient and a little insecure. I make mistakes, I am
          out of control and at times hard to handle. But if you can't handle me
          at my worst, then you sure as hell don't deserve me at my best.”
        </Tab>
        <Tab eventKey='details' title='DETAILS'>
          “I'm selfish, impatient and a little insecure. I make mistakes, I am
          out of control and at times hard to handle. But if you can't handle me
          at my worst, then you sure as hell don't deserve me at my best.”
        </Tab>
      </Tabs>
    </div>
  );
}

export default Tab;
