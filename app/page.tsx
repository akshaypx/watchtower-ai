"use client";
import { ModeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Camera,
  FlipHorizontal,
  PersonStanding,
  Video,
  Volume2,
} from "lucide-react";
import React, { useRef, useState } from "react";
import Webcam from "react-webcam";
import { toast } from "sonner";
import { title } from "process";
import { PuffLoader } from "react-spinners";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Slider } from "@/components/ui/slider";
import { beep } from "@/lib/utils";

type Props = {};

const HomePage = (props: Props) => {
  const webcamRef = useRef<Webcam>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [mirrored, setMirrored] = useState<boolean>(false);
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [autoRecordEnabled, setAutoRecordEnabled] = useState<boolean>(false);
  const [volume, setVolume] = useState(0.8);

  return (
    <div className="flex h-screen">
      {/* Left division for webcam  */}
      <div className="relative">
        <div className="relative h-screen w-full">
          <Webcam
            ref={webcamRef}
            mirrored={mirrored}
            className="h-full w-full object-contain p-2"
          />
          <canvas
            ref={canvasRef}
            className="absolute top-0 left-0 h-full w-full object-contain"
          ></canvas>
        </div>
      </div>

      {/* Right division for container for button panel and wiki section  */}
      <div className="flex flex-row flex-1">
        <div className="border-primary/5 border-2 max-w-xs flex flex-col gap-2 justify-between shadow-md rounded-md p-4">
          {/* top section  */}
          <div className="flex flex-col gap-2">
            <ModeToggle />
            <Button
              variant={"outline"}
              size={"icon"}
              onClick={() => {
                setMirrored((prev) => !prev);
              }}
            >
              <FlipHorizontal />
            </Button>
            <Separator className="my-2" />
          </div>
          {/* middle section  */}
          <div className="flex flex-col gap-2">
            <Separator className="my-2" />
            <Button
              variant={"outline"}
              size={"icon"}
              onClick={userPromptScreenshot}
            >
              <Camera />
            </Button>
            <Button
              variant={isRecording ? "destructive" : "outline"}
              size={"icon"}
              onClick={userPromptRecord}
            >
              <Video />
            </Button>
            <Separator className="my-2" />
            <Button
              variant={autoRecordEnabled ? "destructive" : "outline"}
              size={"icon"}
              onClick={toggleAutoRecord}
              className="flex justify-center items-center"
            >
              {autoRecordEnabled ? (
                <div className="flex justify-center items-center">
                  <PuffLoader size={30} color="white" />
                </div>
              ) : (
                <PersonStanding />
              )}
            </Button>
            <Separator className="my-2" />
          </div>
          {/* bottom section  */}
          <div className="flex flex-col gap-2">
            <Separator className="my-2" />
            <Popover>
              <PopoverTrigger asChild>
                <Button variant={"outline"} size={"icon"}>
                  <Volume2 />
                </Button>
              </PopoverTrigger>
              <PopoverContent>
                <Slider
                  max={1}
                  min={0}
                  step={0.2}
                  defaultValue={[volume]}
                  onValueCommit={(val) => {
                    setVolume(val[0]);
                    beep(val[0]);
                  }}
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>
      </div>
    </div>
  );

  //handler functions
  function userPromptScreenshot() {
    //take picture
    //save it to downloads
  }
  function userPromptRecord() {
    //check if recording
    //then stop recording
    //and save to downloads
    //if not recoring
    //  start recording
  }
  function toggleAutoRecord() {
    if (autoRecordEnabled) {
      setAutoRecordEnabled(false);
      toast("Autorecord Disabled");
      //show toast to user to notify the change
    } else {
      setAutoRecordEnabled(true);
      toast("Autorecord Enabled");
      //show toast
    }
  }
};

export default HomePage;
