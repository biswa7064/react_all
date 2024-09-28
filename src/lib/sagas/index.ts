import { all } from "redux-saga/effects"
import userSaga from "./userSaga"
import { watchFeedbackSaga } from "./feedbackSaga"
import { watchCartProducts } from "./multipleSaga"

export default function* rootSaga() {
	yield all({
		user: userSaga(),
		feedback: watchFeedbackSaga(),
		cartProducts: watchCartProducts()
	})
}
