# Day 40: Bài tập về nhà

## Redux Core & React-Redux Integration

-   Chạy dự án:
    B1: Clone repo về máy
    B2: Chạy lệnh npm run all => Để chạy mock-api và npm run dev

---

## 🎯 Yêu cầu chung

-   Tạo repo **f8-zoom-day40** sử dụng **Vite** (template React – JavaScript + SWC).
-   Deploy bài tập trên **GitHub Pages** (sử dụng `gh-pages`).
-   Giao diện đơn giản, sạch sẽ (tự viết **CSS/SCSS**).
-   **Mục tiêu chính:** Hiểu sâu về Redux Core và tự implement React-Redux.

---

## 📌 Bài 1: Tự implement Redux Core từ đầu

### 1.1. Tạo Redux Core tại `public/redux.js`

-   Export function `createStore(reducer, preloadedState)` với các methods:
    -   `getState()`: Trả về state hiện tại.
    -   `dispatch(action)`: Cập nhật state thông qua reducer.
    -   `subscribe(listener)`: Đăng ký listener, trả về function `unsubscribe`.

👉 File này phải là **pure JavaScript** (không phụ thuộc vào React hay framework nào).

### 1.2. Tạo file `public/redux.html`

-   File HTML chạy độc lập để demo Redux Core.
-   Import `redux.js` bằng `<script>` và demo counter app.

#### Yêu cầu giao diện

-   Hiển thị số counter hiện tại.
-   Buttons:
    -   **Increase** (tăng 1).
    -   **Decrease** (giảm 1).
    -   **Reset** (về 0).
    -   **Remove Listener** (ngắt listener).

#### Expected behavior

-   Click **Increase** → Counter tăng 1.
-   Click **Decrease** → Counter giảm.
-   Click **Reset** → Counter về 0.
-   Click **Remove Listener** → State vẫn thay đổi (xem `console.log`) nhưng UI không update.

👉 Cần hiểu rõ vì sao UI không update sau khi **unsubscribe** – đây là cốt lõi của **subscription pattern**.  
Luôn `console.log` state mỗi lần dispatch để verify.

---

## 📌 Bài 2: Task Management với React-Redux tự implement

### 2.1. Copy Redux Core & tạo React-Redux

-   Copy file `redux.js` từ `public/redux.js` sang `src/libs/redux.js`.
-   Tạo `src/libs/react-redux.js` và implement:

#### Provider Component

-   Nhận prop `store` và `children`.
-   Dùng React Context để provide store xuống component tree.

#### useStore Hook

-   Trả về store instance từ Context.

#### useSelector Hook

-   Nhận selector function làm tham số.
-   Subscribe vào store và re-render component khi selected value thay đổi.
-   Tối ưu để chỉ re-render khi value thực sự thay đổi.
-   **Unsubscribe** khi component unmount.

#### useDispatch Hook

-   Trả về dispatch từ store.

👉 **Lưu ý:**

-   Không dùng `redux` và `react-redux` từ npm.
-   Handle edge cases khi component unmount.

---

### 2.2. Setup JSON Server

-   Cài đặt `json-server`.
-   Tạo file `db.json` ở thư mục gốc với cấu trúc phù hợp (mỗi task có `id`, `title`, ...).
-   Thêm script `mock-api` vào `package.json`:

```json
"scripts": {
  "mock-api": "json-server --watch db.json --port 3001"
}
```

### 2.3. Cấu trúc thư mục

db.json # Database cho json-server

public/
├─ redux.js # Redux core implementation
└─ redux.html # Demo Redux core với vanilla JS

src/
├─ libs/
│ ├─ redux.js # Copy từ public/redux.js
│ └─ react-redux.js # React-Redux implementation
├─ store/
│ ├─ index.js # Config store với Redux tự implement
│ └─ reducers/
│ └─ taskReducer.js
├─ pages/
│ ├─ TaskList/
│ │ ├─ index.jsx
│ │ └─ TaskList.module.scss
│ ├─ NewTask/
│ │ ├─ index.jsx
│ │ └─ NewTask.module.scss
│ └─ EditTask/
│ ├─ index.jsx
│ └─ EditTask.module.scss
├─ components/
│ ├─ TaskItem/
│ │ ├─ index.jsx
│ │ └─ TaskItem.module.scss
│ └─ TaskForm/
│ ├─ index.jsx
│ └─ TaskForm.module.scss
└─ App.jsx

### 2.4. Redux Actions & Reducer

-   Actions cần implement
    -   SET_TASKS: Set danh sách tasks từ API.
    -   ADD_TASK: Thêm task mới.
    -   UPDATE_TASK: Cập nhật task.
    -   DELETE_TASK: Xóa task.
    -   Reducer requirements
    -   Initial state gồm:
-   Reducer requirements
    -   Initial state phải có: tasks (array), loading (boolean), error (null hoặc string)
    -   Mỗi action phải trả về state mới, không mutate state cũ
    -   Handle các action types tương ứng với logic phù hợp

### 2.5. Pages Requirements

1. Sử dụng useSelector từ src/libs/react-redux.js để lấy tasks
2. Sử dụng useDispatch từ src/libs/react-redux.js để dispatch actions
3. useEffect để fetch tasks khi component mount và dispatch SET_TASKS
4. Hiển thị danh sách tasks với mỗi item có:
    - Title của task
    - Button “Edit” -> Navigate tới /:id/edit
    - Button “Delete” -> Gọi API DELETE, sau đó dispatch DELETE_TASK
5. Button “Create New Task” -> Navigate tới /new-task
6. Hiển thị loading state khi đang fetch
7. Hiển thị message “Chưa có task nào” nếu list rỗng
8. Console.log mỗi khi component re-render để debug

NewTask Page (/new-task):

1. Form với input field cho title
2. Khi submit:
    - Validate title không được rỗng
    - Gọi API POST để tạo task mới
    - Dispatch ADD_TASK với data response
    - Navigate về / sử dụng useNavigate
3. Button “Cancel” để quay về trang list
4. Disable form khi đang submit
5. Hiển thị error nếu API fail

EditTask Page (/:id/edit):

1. Sử dụng useParams để lấy id
2. Pre-fill form với data hiện tại
3. Nếu task không tồn tại (sai id - lỗi 404), redirect về /
4. Khi submit:
    - Validate title không được rỗng
    - Gọi API PUT/PATCH để update
    - Dispatch UPDATE_TASK với data mới
    - Navigate về /
5. Button “Cancel” để quay về trang list
6. Disable form khi đang submit

### 2.6. Component Requirements

TaskForm Component:

    - Reusable form component dùng chung cho Create và Edit
    - Props: initialData, onSubmit, submitText (“Create” hoặc “Update”), isLoading
    - Validation: Title không được trống sau khi đã trim khoảng trắng thừa
    - Hiển thị error message nếu validation có lỗi
    - Auto focus vào input field khi component mount

TaskItem Component:

    - Props: task, onEdit, onDelete, isDeleting
    - Confirm trước khi xóa: “Bạn có chắc muốn xóa task này?”
    - Disable các button khi đang xóa
    - Có visual feedback khi hover các buttons

Tip: Bắt đầu với Redux core trong JS thuần để hiểu rõ cơ chế của Redux. Test kỹ trong redux.html trước khi copy sang React. Debug bằng cách log mọi thứ - dispatch, state changes, renders.
