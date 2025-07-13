import { Button } from "@/components/ui/button";
import { TIMEOUT } from "dns";
import { useRef, useState } from "react";
import { Navigate, useParams } from "react-router-dom";

const isRecordingSupported = !!navigator.mediaDevices &&
typeof navigator.mediaDevices.getUserMedia === 'function' &&
typeof window.MediaRecorder === 'function'

type RoomParams = {
    roomId: string
}
export function RecordRoomAudio() {
    const params = useParams<RoomParams>()
    const [isRecording, setIsRecording] = useState(false)
    const recorder = useRef<MediaRecorder | null>(null)
    const intervalRelf = useRef<NodeJS.Timeout>()

    async function stopRecording() {
        setIsRecording(false)

        if( recorder.current && recorder.current.state !== 'inactive') {
            recorder.current.stop()
        }

        if ( intervalRelf.current) {
            clearInterval(intervalRelf.current)
        }
    }

    async function  uploadAudio(audio: Blob) {
        const formData = new FormData()
        formData.append('file', audio, 'audio.webm')
        const response =   await fetch(`http://localhost:3333/rooms/${params.roomId}/audio`, {
            method: 'POST',
            body: formData,
        })

        const result = await response.json()

        console.log(result)
    }
    function createRecorder(audio: MediaStream) {
        recorder.current = new MediaRecorder(audio, {
            mimeType: 'audio/webm',
            audioBitsPerSecond: 64_000,
        })
        recorder.current.ondataavailable = event => {
            if (event.data.size > 0) {
                // biome-igonore lint/suspicious/noConsole: <explanation>
                uploadAudio(event.data)
            }
        }
        recorder.current.onstart = () => {
            console.log('Gravação iniciada!')
        }
        recorder.current.onstop = () => {
            console.log('Gravação encerrada/pausada')
        }
        recorder.current.start()
    }
    async function startRecording() {
        if (!isRecordingSupported) {
            alert('O seu navegador não tem suporte a gravação')
            return
        }
        setIsRecording(true)

        const audio = await navigator.mediaDevices.getUserMedia({
            audio: {
            echoCancellation: true,
            noiseSuppression: true,
            sampleRate: 44_100,
            }
        })
        createRecorder(audio)
        intervalRelf.current = setInterval(()=> {
            recorder.current?.stop()

            createRecorder(audio)
        }, 5000)
    }
    if(!params.roomId) {
        return <Navigate replace to="/"/>
    }
    return (
        <div className="h-screen flex items-center justify-center">
            {isRecording ? (<Button onClick={stopRecording}>Pausar gravação</Button>) : (<Button onClick={startRecording}>Gravar áudio</Button>)}
            {isRecording ? <p>Gravando...</p> : <p>Pausado</p>}
        </div>
    )
}