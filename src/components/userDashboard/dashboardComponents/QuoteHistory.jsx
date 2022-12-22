import React from 'react';

// components
import QuotationItem  from '../dashboardItems/QuotationItem';

import './quoteHistory.css'

const QuoteHistory =  () => {
    return (
        <>
            <div className="quote">
                <span className="quoteHeading">Your Quotes History</span>

                <div className="quoteItemWrapper">
                    <QuotationItem />
                </div>
            </div>
        </>
    )
};

export default QuoteHistory;