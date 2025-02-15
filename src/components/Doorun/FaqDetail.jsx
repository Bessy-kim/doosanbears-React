import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import faqData from '../../data/faqData.json';

const FaqDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const faq = faqData.find((faq) => faq.id === parseInt(id));

  if (!faq) {
    return <div>해당 게시글을 찾을 수 없습니다.</div>;
  }

  // 이전 공지사항과 다음 공지사항 찾기
  const faqIndex = faqData.findIndex((faqItem) => faqItem.id === parseInt(id));
  const prevFaq = faqIndex > 0 ? faqData[faqIndex - 1] : null;
  const nextFaq = faqIndex < faqData.length - 1 ? faqData[faqIndex + 1] : null;

  const handleBack = () => {
    navigate("/doorundoorun/faq");
  };
  return (
    <section class="faq_detail">
      <h2 class="hide">두런두런 팬 소식 상세페이지</h2>
      <div className="list_view" key={faq.id}>
        <div className="top">
          <div className="inner layout_fix">
            <div className="txt_area">
              <p className="tit">{faq.title}</p>
              <p className="txt">{faq.date}</p>
            </div>
            <button type="button" className="btn_back" onClick={handleBack}>
              목록
            </button>
          </div>
        </div>
        <div className="bottom layout_fix">
          <div className="inner">
            {faq.img && (
            <p>
              <img src={`${process.env.PUBLIC_URL}/${faq.img}`} alt={faq.title} />
            </p>
            )}
          </div>
          <div className="inner_text">
          {faq.contents.split(/\n{2}/).map((content, pIndex) => (
            <p key={pIndex}>
              {content.split("\n").map((line, idx) => (
                <p key={idx}>
                  {line}
                  <br />
                </p>
              ))}
              <br />
            </p>
          ))}
          </div>
        </div>
      </div>
      <div className="post_nav">
        {prevFaq ? (
          <div className="prev">
            <button>prev</button>
            <span>이전글</span>
            <div className="prev_tit">
              <button onClick={() => navigate(`/doorundoorun/faq/${prevFaq.id}`)}>
                {prevFaq.title}
              </button>
            </div>
          </div>
        ) : (
          <div className="prev" style={{ display: "none" }}></div>
        )}

        {nextFaq ? (
          <div className="next">
            <button>next</button>
            <span>다음글</span>
            <div className="next_tit">
              <button onClick={() => navigate(`/doorundoorun/faq/${nextFaq.id}`)}>
                {nextFaq.title}
              </button>
            </div>
          </div>
        ) : (
          <div className="next" style={{ display: "none" }}></div>
        )}
      </div>
    </section>
  );
};

export default FaqDetail;