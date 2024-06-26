import {useState, useRef, useEffect, RefObject, MouseEvent} from 'react';
import './App.scss';

function App() {
    const [mpName, setMpName] = useState('');
    const [mpEmail, setMpEmail] = useState('');
    const [yourName, setYourName] = useState('');
    const [yourEmail, setYourEmail] = useState('');
    const [yourConst, setYourConst] = useState('');
    const [yourService, setYourService] = useState('');
    const [yourAddress, setYourAddress] = useState('');
    const [isOptionalServiceChecked, setIsOptionalServiceChecked] = useState(false);
    const [isOptionalMeetingChecked, setIsOptionalMeetingChecked] = useState(false);
    const [isEmailSent, setIsEmailSent] = useState(false);
    const [isTextCopied, setIsTextCopied] = useState(false);
    const [tooltipPosition, setTooltipPosition] = useState({x: 0, y: 0});
    const [isEdge, setIsEdge] = useState(false);

    const emailRef: RefObject<HTMLParagraphElement> = useRef<HTMLParagraphElement>(null);

    const placeholder = <strong>{'{please fill in}'}</strong>;

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
    };

    const handleTooltipMouseMove = (event: MouseEvent) => {
        setTooltipPosition({x: event.clientX, y: event.clientY});
    };

    const optionalService = `I’d be delighted to host you at our occupational therapy service ${yourService || placeholder} to see for yourself how important these services are and the difference we make.
    `;
    const optionalMeeting = `I’d welcome a meeting to discuss how MPs can prioritise occupational therapy and improve our community’s wellbeing.
    `;

    const formattedText = (text: string) => text.split('\n').map((line, index) => (
        <span key={index}>
            {line}
            <br/>
        </span>
    ));

    const getEmailBody = () => {
        if (emailRef.current) {
            return encodeURIComponent(emailRef.current.innerText.replace(/\n/g, '\r\n'));
        }
        return '';
    };

    const copyToClipboard = () => {
        if (emailRef.current) {
            const range = document.createRange();
            range.selectNode(emailRef.current);
            window.getSelection()?.removeAllRanges(); // clear existing selections
            window.getSelection()?.addRange(range);
            document.execCommand('copy');
            window.getSelection()?.removeAllRanges(); // clear selections again
            setIsTextCopied(true);
            setTimeout(() => setIsTextCopied(false), 3000); // Reset after 3 seconds
        }
    };

    useEffect(() => {
        const link = document.querySelector('.sendEmail');
        if (link) {
            link.addEventListener('click', () => {
                setIsEmailSent(true);
            });
        }
    }, [mpEmail, yourName, yourEmail, yourConst, yourService, yourAddress, isOptionalServiceChecked, isOptionalMeetingChecked]);

    useEffect(() => {
        // Detect if the browser is Microsoft Edge
        const isEdgeBrowser = /Edg/.test(navigator.userAgent);
        setIsEdge(isEdgeBrowser);
    }, []);

    return (
        <>
            <ul id='infotext'>
                <li>Please fill out your information then press the send email button at the bottom of the page.</li>
                <li>The text will update automatically as you type.</li>
                <li>Once you've pressed the send email button – an email should open up. If this doesn't work, please copy and paste the text instead or press copy email text.</li>
                <li>The text can be selected by clicking anywhere inside the email copy.</li>
                <li>We recommend you maximise your chances of being heard by reaching out to multiple candidates.</li>
            </ul>

            <div className="inputs">
                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <label htmlFor="mpName">Candidate's name:</label>
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
                        <label htmlFor="yourAddress">Your address (including postcode):</label>
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
                    {isOptionalServiceChecked && (
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

                    <div className="checkbox-group">
                        <label htmlFor="optionalService">
                            <span className="labelText">Do you want to invite your candidate to see your local occupational therapy service?</span>
                            <strong id="candidateWarning">Please clear this with your service's comms department before inviting a candidate.</strong>
                        </label>
                        <input
                            type="checkbox"
                            id="optionalService"
                            checked={isOptionalServiceChecked}
                            onChange={(e) => setIsOptionalServiceChecked(e.target.checked)}
                        />
                    </div>

                    <div className="checkbox-group">
                        <label htmlFor="optionalMeeting">Do you want to invite your candidate to meet with you?</label>
                        <input
                            type="checkbox"
                            id="optionalMeeting"
                            checked={isOptionalMeetingChecked}
                            onChange={(e) => setIsOptionalMeetingChecked(e.target.checked)}
                        />
                    </div>
                </form>
            </div>
            <p className="email" ref={emailRef}>
                Dear {mpName || placeholder},<br/><br/>
                I’m an occupational therapist in {yourConst || placeholder} and I’m reaching out to highlight why occupational therapy is essential for our community. I'd be happy to meet with you in person to discuss this further.<br/><br/>
                Occupational therapy helps people to do the things they want and have to do. That could mean helping overcome challenges learning at school, going to work, playing sport or simply doing the dishes. Occupations are essential to living. They give our lives meaning, purpose and structure.<br/><br/>
                With the upcoming general election, I believe prioritising occupational therapy services will greatly benefit residents across our constituency. Occupational therapy is a solution to many of the UK's health and care challenges – it helps relieve pressure on acute services and helps people to get in to work.<br/><br/>
                We're facing a shortage of occupational therapists, and without support, we risk failing to meet our population's needs. We need to integrate occupational therapy into community settings, including in GP surgeries and schools, to provide help at the right time.<br/><br/>
                I have provided a link to a <a href="https://www.rcot.co.uk/news/rcot-general-election-briefing" target='_blank'>briefing from the Royal College of Occupational Therapists</a> with more information and recommendations for the next government for you to consider.<br/><br/>
                {isOptionalServiceChecked && formattedText(optionalService)}
                {isOptionalMeetingChecked && formattedText(optionalMeeting)}
                Thank you for taking the time to consider this. Your support for occupational therapy if you are elected to parliament would make a significant difference.<br/><br/>
                I look forward to hearing from you.<br/><br/>
                Best wishes<br/><br/>
                <strong>{yourName || placeholder}</strong><br/>
                <strong>{yourAddress || placeholder}</strong><br/>
                <strong>{yourEmail || placeholder}</strong><br/>
            </p>
            <div className="buttonContainer">
                <div className="tooltip" onMouseMove={handleTooltipMouseMove}>
                    <a className="fakeButton sendEmail"
                       href={`mailto:${mpEmail}?subject=Occupational%20therapy&body=${getEmailBody()}`}
                       onClick={() => setIsEmailSent(true)}
                    >
                        Open email app
                    </a>
                    {isEdge && (
                        <span
                            className="tooltiptext"
                            style={{left: `${tooltipPosition.x}px`, top: `${tooltipPosition.y}px`}}
                        >
                            The open email app button won't work in Microsoft Edge browser unless you have a default email client selected. Please press copy email text instead.
                        </span>
                    )}
                </div>

                <button
                    className="fakeButton"
                    onClick={copyToClipboard}
                >
                    Copy email text
                </button>
            </div>

            <p className={`info ${isEmailSent ? 'visible' : ''}`}>We recommend you maximise your chances of being heard by reaching out to multiple candidates.</p>
            <p className={`info ${isTextCopied ? 'visible' : ''}`}>Email text copied to clipboard</p>
        </>
    );
}

export default App;
