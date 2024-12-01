import cv2

# Load pre-trained Haar Cascade Classifier for face detection
# Ensure the haarcascade_frontalface_default.xml file is in the same directory or provide its full path
cascade_path = cv2.data.haarcascades + "haarcascade_frontalface_default.xml"
face_cascade = cv2.CascadeClassifier(cascade_path)

# Open the camera (default ID 0)
cap = cv2.VideoCapture(0)

if not cap.isOpened():
    print("Error: Camera not accessible")
    exit()

while True:
    # Capture frame-by-frame
    ret, frame = cap.read()
    if not ret:
        print("Error: Could not read frame")
        break

    # Convert frame to grayscale (Haar Cascade works with grayscale images)
    gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)

    # Detect faces in the frame
    faces = face_cascade.detectMultiScale(gray, scaleFactor=1.1, minNeighbors=5, minSize=(30, 30))

    # Draw rectangles around detected faces
    for (x, y, w, h) in faces:
        cv2.rectangle(frame, (x, y), (x + w, y + h), (255, 0, 0), 2)

    # Display the headcount on the video feed
    headcount = len(faces)
    font = cv2.FONT_HERSHEY_SIMPLEX
    cv2.putText(frame, f"Live Count: {headcount}", (20, 50), font, 1, (0, 255, 0), 2, cv2.LINE_AA)

    # Show the video feed with overlays
    cv2.imshow("Live People Counter", frame)

    # Press 'q' to quit the feed
    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

# Release the camera and close all OpenCV windows
cap.release()
cv2.destroyAllWindows()

