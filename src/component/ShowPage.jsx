import { useState,useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Modal from 'react-modal';
import ReactHtmlParser from 'html-react-parser';

export function ShowPage() {
  const { id } = useParams();
  const [show, setShow] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [timeSlot, setTimeSlot] = useState('');

  const handleFormSubmit = (event) => {
    event.preventDefault();
    setShowModal(false);
  }

  useEffect(() => {
    fetch(`https://api.tvmaze.com/shows/${id}`)
      .then(response => response.json())
      .then(data => setShow(data));
  }, [id]);

  if (!show) {
    return <div>Loading...</div>;
  }
  const summaryText = ReactHtmlParser(show.summary);

  return (
    <div className='p-4'>
      <img src={show.image.medium} alt={show.name} className='rounded-lg'/>
      <h1 className='font-bold '>{show.name}</h1>
      <p className='text-gray-600'>{show.genres.join(', ')}</p>
      <p className='mt-4'>{summaryText}</p>

      <button onClick={() => setShowModal(true)} className='bg-yellow-300 rounded-full p-2'>Book Ticket</button>
      <Modal isOpen={showModal} onRequestClose={() => setShowModal(false)}>
        <h2 className='font-bold'>Book Ticket for {show.name}</h2>
        <form onSubmit={handleFormSubmit}>
          <div>
            <label htmlFor="time-slot">Select a Time Slot:</label>
            <select id="time-slot" value={timeSlot} onChange={(e) => setTimeSlot(e.target.value)} className='bg-gray-200'>
              <option value="">--Select a Time Slot--</option>
              <option value="10:00am">10:00am</option>
              <option value="2:00pm">2:00pm</option>
              <option value="6:00pm">6:00pm</option>
            </select>
          </div>
          <button type="submit" className='bg-yellow-500 rounded-full p-2'>Book Ticket</button>
        </form>
      </Modal>
    </div>
  );
}

