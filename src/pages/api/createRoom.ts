import { NextApiRequest, NextApiResponse } from "next";

import { EncodedFileType, RoomServiceClient } from "livekit-server-sdk";

const apiKey = process.env.LIVEKIT_API_KEY;
const apiSecret = process.env.LIVEKIT_API_SECRET;
const lkHost = process.env.NEXT_PUBLIC_LIVEKIT_URL as string;

const startRoomWithRecording = async (roomName: string) => {
  // const egressClient = new EgressClient(lkHost, apiKey, apiSecret);
  const roomService = new RoomServiceClient(lkHost, apiKey, apiSecret);

  const [accessKey, secret, region, bucket] = [
    process.env.S3_IAM_ACCESS_KEY,
    process.env.S3_IAM_SECRET,
    process.env.S3_REGION,
    process.env.S3_BUCKET,
  ] as string[];

  if (!accessKey || !secret || !region || !bucket) {
    throw Error("S3 environment variables aren't set up correctly");
  }

  console.log(`Creating room ${roomName}...`);

  const egressRequest = {
    room: {
      roomName,
      layout: "grid",
      fileOutputs: [
        {
          fileType: EncodedFileType.MP4,
          filepath: `recordings/kitt/${roomName}.mp4`,
          s3: { accessKey, secret, region, bucket },
        },
      ],
    },
  };

  const room = await roomService.createRoom({
    name: roomName,
    emptyTimeout: 30,
    // egress: egressRequest,
  });
  console.log(room);
  await roomService.listRooms().then((rooms) => {
    console.log("existing rooms", rooms);
  });

  return room;
};

export default async function handeRoute(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { roomName } = req.query;

    if (typeof roomName !== "string") {
      res.statusMessage =
        "identity and roomName have to be specified in the request";
      res.status(403).end();
      return;
    }

    if (!apiKey || !apiSecret) {
      res.statusMessage = "Environment variables aren't set up correctly";
      res.status(500).end();
      return;
    }

    const room = await startRoomWithRecording(roomName)
    .catch((e) => {
      console.error(`Failed to start room ${roomName}`, e.message);
    });

    res.status(200).json(room);
  } catch (e) {
    res.statusMessage = (e as Error).message;
    res.status(500).end();
  }
}
