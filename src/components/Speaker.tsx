import { useSpeechToTextHelper } from "../hooks/useSpeechToTextHelper";
import  Button  from "./Button";
import { MicrophoneIcon,XCircleIcon } from "@heroicons/react/24/solid";
import SpeechRecognition from "react-speech-recognition";

interface SpeakerProps {
  handleClear:(e:React.MouseEvent<HTMLButtonElement>) => void;
}

const Speaker =({handleClear}:SpeakerProps)=>{
    const {listening,error} = useSpeechToTextHelper();

    const handleSpeech=()=>{
        SpeechRecognition.startListening();
    };
    return(

        <div>
        {error && <div>{error}</div>}
        <div className="flex gap-2 py-1 items-center text-center justify-center">
            <span className="font-medium">{listening ? "Mic on" : "Mic off"}</span>
            <Button
                handleClick={handleSpeech}
                extraBtnClasses="bg-lightOk"
                title="Start"
                content={{
                    icon:MicrophoneIcon,
                }}
                    
                
            />
                
            
            <Button
                handleClick={handleClear}
                extraBtnClasses="bg-light"
                type="reset"
                title="Reset"
                content={{
                    icon:XCircleIcon,
                }}
            />
               
            
        </div>
    </div>
    );


}

export default Speaker;