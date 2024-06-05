import { useState, useRef, RefObject } from 'react';
import './App.css';

function App() {
    const [mpName, setMpName] = useState('');
    const [mpEmail, setMpEmail] = useState('');
    const [yourName, setYourName] = useState('');
    const [yourEmail, setYourEmail] = useState('');
    const [yourConst, setYourConst] = useState('');
    const [yourService, setYourService] = useState('');
    const [yourAddress, setYourAddress] = useState('');
    const [isOptionalChecked, setIsOptionalChecked] = useState(false);

    const emailRef: RefObject<HTMLParagraphElement> = useRef<HTMLParagraphElement>(null);

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
    };

    const optionalText = `I’d welcome a meeting to discuss how MPs can prioritise occupational therapy and improve our community’s wellbeing.
              
I’d be delighted to host you at our occupational therapy service ${yourService} to see for yourself how important these services are and the difference we make.
`;

    const formattedText = optionalText.split('\n').map((line, index) => (
        <span key={index}>
            {line}
            <br />
        </span>
    ));

    const getEmailBody = () => {
        if (emailRef.current) {
            return encodeURIComponent(emailRef.current.innerText.replace(/\n/g, '\r\n'));
        }
        return '';
    };

    return (
        <>
            <div className="inputs">
                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <label htmlFor="mpName">Name of candidate:</label>
                        <input
                            type="text"
                            id="mpName"
                            value={mpName}
                            onChange={(e) => setMpName(e.target.value)}
                        />
                    </div>
                    <div className="input-group">
                        <label htmlFor="mpEmail">Candidate's email:</label>
                        <input
                            type="text"
                            id="mpEmail"
                            value={mpEmail}
                            onChange={(e) => setMpEmail(e.target.value)}
                        />
                    </div>
                    <div className="input-group">
                        <label htmlFor="yourName">Your name:</label>
                        <input
                            type="text"
                            id="yourName"
                            value={yourName}
                            onChange={(e) => setYourName(e.target.value)}
                        />
                    </div>
                    <div className="input-group">
                        <label htmlFor="yourConstituency">Your constituency:</label>
                        <input
                            type="text"
                            id="yourConstituency"
                            value={yourConst}
                            onChange={(e) => setYourConst(e.target.value)}
                        />
                    </div>
                    <div className="input-group">
                        <label htmlFor="yourAddress">Your address:</label>
                        <input
                            type="text"
                            id="yourAddress"
                            value={yourAddress}
                            onChange={(e) => setYourAddress(e.target.value)}
                        />
                    </div>
                    <div className="input-group">
                        <label htmlFor="yourEmail">Your email:</label>
                        <input
                            type="email"
                            id="yourEmail"
                            value={yourEmail}
                            onChange={(e) => setYourEmail(e.target.value)}
                        />
                    </div>
                    {isOptionalChecked && (
                        <div className="input-group">
                            <label htmlFor="yourService">Your service:</label>
                            <input
                                type="text"
                                id="yourService"
                                value={yourService}
                                onChange={(e) => setYourService(e.target.value)}
                            />
                        </div>
                    )}
                    <div className="input-group checkbox-group">
                        <label htmlFor="optional">Do you want to invite your candidate to see your local occupational
                            therapy service?</label>
                        <input
                            type="checkbox"
                            id="optional"
                            checked={isOptionalChecked}
                            onChange={(e) => setIsOptionalChecked(e.target.checked)}
                        />
                    </div>
                </form>
            </div>
            <a href={`mailto:${mpEmail}?subject=Occupational%20therapy&body=${getEmailBody()}`} className="email-button">Send email</a>
            <p className="email" ref={emailRef}>
                Dear {mpName},<br/><br/>
                I’m an occupational therapist in {yourConst} and I’m reaching out to highlight why
                occupational therapy is essential for our community. I'd be happy to meet with you in person to discuss
                this further.<br/><br/>
                Occupational therapy helps people to do the things they want and have to do. That could mean helping
                overcome challenges learning at school, going to work, playing sport or simply doing the dishes.
                Occupations are essential to living. They give our lives meaning, purpose and structure.<br /><br />
                With the upcoming general election, I believe prioritising occupational therapy services will greatly
                benefit residents across our constituency. Occupational therapy is a solution to many of the UK's health
                and care challenges – it helps relieve pressure on acute services and helps people to get in to work.<br /><br />
                We're facing a shortage of occupational therapists, and without support, we risk failing to meet our
                population's needs. We need to integrate occupational therapy into community settings, including in GP
                surgeries and schools, to provide help at the right time.<br /><br />
                I have attached a copy of a briefing from the Royal College of Occupational Therapists with more
                information and recommendations for the next government for you to consider.<br /><br />
                {isOptionalChecked && formattedText}
                Thank you for taking the time to consider this. Your support for occupational therapy if you are elected
                to parliament would make a significant difference.<br /><br />
                I look forward to hearing from you.<br /><br />
                Best wishes<br /><br />
                {yourName}<br />
                {yourAddress}<br />
                {yourEmail}<br />
            </p>
        </>
    );
}

export default App;
