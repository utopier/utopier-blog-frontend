// 권한 요청
Notification.requestPermission(function (status) {
	console.log('Notification permission status:', status);
});

// 알림 표시 + 옵션 + 작업
function displayNotification() {
	if (Notification.permission == 'granted') {
		navigator.serviceWorker.getRegistration().then(function (reg) {
			const options = {
				body: 'Utopier Blog Notification API.',
				icon: 'icon-192x192.png',
				vibrate: [100, 50, 100],
				data: {
					dateOfArrival: Date.now(),
					primaryKey: 1,
				},
				actions: [
					{ action: 'explore', title: 'Go to trends page', icon: 'images/checkmark.png' },
					{ action: 'close', title: 'Close notification', icon: 'images/xmark.png' },
				],
			};
			reg.showNotification('Welcome!', options);
		});
	}
}

displayNotification();
// 지원 확인
if ('Notification' in window && navigator.serviceWorker) {
	// Display the UI to let the user toggle notifications
}
// 허가 확인
if (Notification.permission === 'granted') {
	/* do our magic */
} else if (Notification.permission === 'blocked') {
	/* the user has previously denied push. Can't reprompt. */
} else {
	/* show a prompt to the user */
}
