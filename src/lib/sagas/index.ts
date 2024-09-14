import { all } from "redux-saga/effects"
import userSaga from "./userSaga"
import { watchFeedbackSaga } from "./feedbackSaga"

export default function* rootSaga() {
	yield all({
		user: userSaga(),
		feedback: watchFeedbackSaga()
	})
}
