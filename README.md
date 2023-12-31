## API Endpoints

### `/api/upload`

#### `POST`

This endpoint accepts a file upload and returns an HTML page with a video player that plays the uploaded video.

##### Request

- `POST /api/upload`
- Content-Type: `multipart/form-data`
- Body: A file upload with the key: video
- ![Alt text](image.png)

##### Response

- Status: `200 OK`
- Content-Type: `text/html`
- Body: An HTML page with a video player that plays the uploaded video.

---

### `/api/video`

#### `GET`

This endpoint accepts a query parameter `s3Url`, which should contain the URL of a video file stored in an S3 bucket. It returns an HTML page with a video player that plays the video from the provided S3 URL.

##### Request

- `GET /api/video?s3Url=<S3 URL>`
- Query Parameters:
  - `s3Url`: The URL of the video file in the S3 bucket.

##### Response

- Status: `200 OK`
- Content-Type: `text/html`
- Body: An HTML page with a video player that plays the video from the provided S3 URL.

---

This API allows you to upload videos and retrieve them for playback. The `/api/upload` endpoint handles video uploads and provides a URL for video playback via the `/api/video` endpoint.
