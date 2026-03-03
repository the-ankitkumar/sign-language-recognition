import cv2 as cv
print("OpenCv",cv.__version__)
cap = cv.VideoCapture(0)
print(cap.isOpened())
success , frame = cap.read()
print("Top-left pixel", frame[0,0])
print("Middle pixel", frame[540,960])
gray = cv.cvtColor(frame, cv.COLOR_BGR2GRAY)
print("Color shape", frame.shape)
print("Gray shape", gray.shape)
while True:
    success , frame = cap.read()
    if not success:
        break
    gray = cv.cvtColor(frame,cv.COLOR_BGR2GRAY)
    cv.imshow("color ", frame)
    cv.imshow("gray ", gray)
    if cv.waitKey(1) & 0xFF == ord('q'):
        break
cap.release()
cv.destroyAllWindows()       
print("success", success)
print("frame shape", frame.shape)