navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;
window.RTCPeerConnection = window.RTCPeerConnection || window.webkitRTCPeerConnection || window.mozRTCPeerConnection;

const guestVideo = document.getElementById('guest-video');
const myVideo = document.getElementById('my-video');

const STUN = {
  urls: 'stun:stun.l.google.com:19302'
};

navigator.mediaDevices.getUserMedia({
  video: true,
  audio: false
})
.then(stream => {
  myVideo.src = URL.createObjectURL(stream);
  startPeerConnection(stream);
}).catch(err => {
  debugger;
});

function startPeerConnection(stream) {
  const myConn = new RTCPeerConnection(null);
  const guestConn = new RTCPeerConnection(null);

  myConn.addStream(stream);
  guestConn.onaddstream = e => {
    guestVideo.src = URL.createObjectURL(e.stream);
  };

  myConn.onicecandidate = e => {
    if (e.candidate) {
      guestConn.addIceCandidate(new RTCIceCandidate(e.candidate));
    }
  };

  guestConn.onicecandidate = e => {
    if (e.candidate) {
      myConn.addIceCandidate(new RTCIceCandidate(e.candidate));
    }
  };

  myConn.createOffer()
  .then(offer => {
    return myConn.setLocalDescription(offer)
    .then(() => guestConn.setRemoteDescription(offer))
    .then(() => guestConn.createAnswer())
  })
  .then(offer => {
    return guestConn.setLocalDescription(offer)
    .then(() => myConn.setRemoteDescription(offer));
  })
  .catch(err => {
    debugger;
  });
}
