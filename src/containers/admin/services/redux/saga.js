import { put, takeLatest, select, all, call } from "redux-saga/effects"
import request, { showMessageError, postOptions } from "@utils/request"

import { INITIAL_REQUEST_HOME_START } from "./constants"
import { showLoader, hideLoader } from "@redux/actions/auth"

export function* initialRequest() {
  const storage = yield select(state => state)
  try {
    yield put(showLoader());
    yield all([
      put(hideLoader())
    ])
  } catch (err) {
    yield put(hideLoader())
    yield showMessageError(err)
  }
}

export function* homeSaga() {
  yield takeLatest(INITIAL_REQUEST_HOME_START, initialRequest)
}
