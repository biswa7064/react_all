import { getUsers } from "@/services/user"
import {
	call,
	CallEffect,
	put,
	PutEffect,
	takeLatest
} from "redux-saga/effects"
import { userAction, UserActionType, UserState } from "../redux/userReducer"

export type UserGeneratorType = Generator<
	CallEffect<UserState["users"]> | PutEffect<UserActionType<any>>,
	void
>
// create saga to fetch user lists from API
function* fetchUserLists(): UserGeneratorType {
	try {
		const callRes = yield call(getUsers)
		yield put({ type: "FETCH_USERS_SUCCESS", payload: callRes })
	} catch (error) {
		yield put({
			type: userAction.FETCH_USERS_FAILURE,
			payload: error as Error
		})
	}
}
// take every latest update through the default saga method for user
export default function* userSaga() {
	yield takeLatest(userAction.FETCH_USERS_REQUEST, fetchUserLists)
}
