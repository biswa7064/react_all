import {
	take,
	call,
	put,
	race,
	delay,
	fork,
	cancel,
	CallEffect,
	PutEffect,
	join
} from "redux-saga/effects"
import { feedBackAction } from "../redux/feedbackReducer"
const {
	START_OPERATION,
	OPERATION_SUCCESS,
	OPERATION_FAILURE,
	OPERATION_CANCELLED,
	CANCEL_OPERATION
} = feedBackAction
function* submitFeedBack() {
	for (let i = 0; i < 5; i++) {
		yield delay(1000) // Simulate a step that takes 1 second
		console.log(`Operation step ${i + 1} completed`)
	}
	return "Feedback submitted successfully"
}

function* feedbackSaga(): Generator<any> {
	while (true) {
		yield take(START_OPERATION)

		// Fork the operation to run it in the background
		const operationTask = yield fork(function* (): Generator<
			CallEffect<any> | PutEffect<any>,
			void
		> {
			try {
				const result = yield call(submitFeedBack)
				yield put({ type: OPERATION_SUCCESS, payload: result })
			} catch (error) {
				yield put({
					type: OPERATION_FAILURE,
					payload: (error as Error).message
				})
			}
		})

		// Wait for either operation to complete or cancellation
		const { cancel: cancelled } = yield race({
			completion: join(operationTask),
			cancel: take(CANCEL_OPERATION)
		})

		if (cancelled) {
			// If cancelled, stop the operation and dispatch cancellation action
			yield cancel(operationTask)
			yield put({ type: OPERATION_CANCELLED })
			console.log("Operation was cancelled")
		}
	}
}

export function* watchFeedbackSaga() {
	yield fork(feedbackSaga)
}
