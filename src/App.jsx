import { useState } from 'react';
import { ArrowDownTrayIcon, BoltIcon, NumberedListIcon, XMarkIcon } from '@heroicons/react/24/outline';

function App() {
  const [balance, setBalance] = useState(0);
  const [history, setHistory] = useState('');
  const [modal, setModal] = useState(null);
  const [invoice, setInvoice] = useState('');
  const [receiveData, setReceiveData] = useState({ amount: '', memo: '' });
  const [paymentDetails, setPaymentDetails] = useState(null);

  const closeModal = () => {
    setModal(null);
    setInvoice('');
    setReceiveData({ amount: '', memo: '' });
    setPaymentDetails(null);
  };

  const generateInvoice = () => {
    const genInvoice = "lnbcAPIINVOICE";
    setInvoice(genInvoice);
  };

  const handleInvoiceSubmit = (e) => {
    e.preventDefault();
    const invoiceData = {
      amount: "1000 sats",
      memo: "starbucks coffee payment",
    };
    setPaymentDetails(invoiceData);
  };

  return (
    <div className='font-[Rubik] h-screen flex flex-col gap-10 items-center justify-center bg-gray-800 text-white'>
      <h1 className='text-3xl absolute top-10 text-center'>Welcome to your Bitcoin wallet</h1>
      <h3 className='text-5xl lg:text-7xl font-medium'>{balance} SATS</h3>
      <div className='flex items-center gap-10'>
        <button
          className='text-2xl lg:text-4xl bg-gray-900 rounded-lg flex gap-2 p-4 items-center hover:bg-gray-700 transition duration-200'
          onClick={() => setModal('receive')}
        >
          <ArrowDownTrayIcon className='size-10' />Receive
        </button>
        <button
          className='text-2xl lg:text-4xl bg-gray-900 rounded-lg flex gap-2 p-4 items-center hover:bg-gray-700 transition duration-200'
          onClick={() => setModal('send')}
        >
          <BoltIcon className='size-10' />Send
        </button>
      </div>
      <button
        className='flex items-center text-gray-400 text-xl gap-2 p-4'
        onClick={() => setModal('history')}
      >
        <NumberedListIcon className='size-8' /> History
      </button>

      {modal && (
        <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center'>
          <div className='bg-gray-900 rounded-lg p-6 text-white w-11/12 max-w-md'>
            <div className='flex justify-between items-center mb-4'>
              <h2 className='text-2xl'>
                {modal === 'receive' && 'Create Invoice'}
                {modal === 'send' && 'Pay Invoice'}
                {modal === 'history' && 'TX History'}
              </h2>
              <button onClick={closeModal} className='text-gray-400 hover:text-white'>
                <XMarkIcon className='h-6 w-6' />
              </button>
            </div>
            <div>
              {modal === 'receive' && (
                <div>
                  {!invoice ? (
                    <>
                      <div className='mb-4'>
                        <label className='block text-gray-400 mb-2'>Amount (sats):</label>
                        <input
                          type='number'
                          value={receiveData.amount}
                          onChange={(e) => setReceiveData({ ...receiveData, amount: e.target.value })}
                          placeholder='Enter amount (sats)'
                          className='w-full bg-gray-800 p-2 rounded-lg focus:outline-none'
                        />
                      </div>
                      <div className='mb-4'>
                        <label className='block text-gray-400 mb-2'>Memo:</label>
                        <input
                          type='text'
                          value={receiveData.memo}
                          onChange={(e) => setReceiveData({ ...receiveData, memo: e.target.value })}
                          placeholder='Memo'
                          className='w-full bg-gray-800 p-2 rounded-lg focus:outline-none'
                        />
                      </div>
                      <button
                        onClick={generateInvoice}
                        className='bg-orange-400 w-full py-2 rounded-lg hover:bg-orange-500 transition duration-200'
                      >
                        Generate Invoice
                      </button>
                    </>
                  ) : (
                    <div>
                      <p className='mb-4'>Lightning invoice:</p>
                      <code className='block bg-gray-800 p-4 rounded-lg text-center break-all'>
                        {invoice}
                      </code>
                      <button
                        onClick={closeModal}
                        className='bg-gray-700 mt-4 w-full py-2 rounded-lg hover:bg-gray-600 transition duration-200'
                      >
                        Close
                      </button>
                    </div>
                  )}
                </div>
              )}
              {modal === 'send' && (
                <>
                  {!paymentDetails ? (
                    <form onSubmit={handleInvoiceSubmit}>
                      <div className='mb-4'>
                        <label className='block text-gray-400 mb-2'>Paste Request:</label>
                        <input
                          type='text'
                          placeholder='Paste an invoice, payment req or lnurl code'
                          className='w-full bg-gray-800 p-2 rounded-lg focus:outline-none'
                        />
                      </div>
                      <button
                        type='submit'
                        className='bg-orange-400 w-full py-2 rounded-lg hover:bg-orange-500'
                      >
                        Read
                      </button>
                    </form>
                  ) : (
                    <div>
                      <p className='mb-4'>Invoice Details:</p>
                      <ul className='mb-4'>
                        <li><strong>Amount:</strong> {paymentDetails.amount}</li>
                        <li><strong>Memo:</strong> {paymentDetails.memo}</li>
                      </ul>
                      <button
                        onClick={() => alert('Done!')}
                        className='bg-orange-400 w-full py-2 rounded-lg hover:bg-orange-500 transition duration-200'
                      >
                        Pay
                      </button>
                    </div>
                  )}
                </>
              )}
              {modal === 'history' && (
                <ul className='list-disc pl-5'>
                  <li>{history} API HISTORY</li>
                </ul>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
