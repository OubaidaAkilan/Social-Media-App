import React, { useContext } from 'react';



import { ModalContext } from '../../context/ModalContext';

const DeletePostModal = () => {
  const { setOpenModal } = useContext(ModalContext);

  return (
    <>
      <div className='modal-header'>
        <svg
          onClick={() => setOpenModal(false)}
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          strokeWidth={1.5}
          stroke='currentColor'
          className='modal-icon'>
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            d='M6 18L18 6M6 6l12 12'
          />
        </svg>
      </div>
      <div className='modal-body'>
        <h3 className='modal-title'>له له له! اختفى البوست كأنه سحر! 😂🧙‍♂️🔮</h3>
        <p className='modal-description'>
          يا له 😂 من بوست ساحر! شكله البوست عمل خدعة سحرية 🧙‍♂️ واختفى في الهواء
          الطلق. أو قرر ياخذ قسط من الراحة في أرض الجنيات الرقمية 😁 أو قررالانضمام
         😄✨🎩 .إلى دورة تدريبية للبوستات السحرية
        </p>
        <p className='modal-description'>
          على الرغم من أنه لا يمكننا استعادة البوست، إلا أن هناك العديد من
          الكنوز الأخرى في هذا العالم السحري لاكتشافها. انطلق 😂 في مغامرة
          واكتشف بوستات جديدة ستأسر خيالك وتجعل الجميع يصفق بحيرة للسحر الخاص
         🥳🎉 بك!  
        </p>
        <p className='modal-description'>
          تذكر، في عالم الإنترنت المدهش، تتلاشى البوستات ولكن تبقى الذكريات
          الساحرة في قلوبنا🥱. فاستمر 🤷‍♂️ في البحث عن السحر والمتعة، ولا تدع اختفاء
        💫😄🌟  البوست يُبهت سحرك الخاص! 
        </p>
      </div>
    </>
  );
};

export default DeletePostModal;
