import { Form, Formik } from "formik";
import { useTasks } from "../context/TaskProvider";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function TaskForm() {
  const { createTask, getTask, updateTask } = useTasks();
  const [task, setTask] = useState({
    title: "",
    description: "",
  });

  const params = useParams();
  const navigate = useNavigate();
  console.log(params);
  console.log(params.id);

  useEffect(() => {
    const loadTask = async () => {
      if (params.id) {
        const task = await getTask(params.id);
        setTask({
          title: task.title,
          description: task.description,
        });
      }
    };
    loadTask();
  }, []);

  return (
    <div className="">
      <Formik
        initialValues={task}
        enableReinitialize={true}
        onSubmit={async (values, actions) => {
          console.log(values);

          if (params.id) {
            await updateTask(params.id, values);
            
          } else {
            await createTask(values);
          }
          navigate("/");

          setTask({
            title: "",
            description: "",
          });
        }}
      >
        {({ handleChange, handleSubmit, values, isSubmitting }) => (
          <Form
            onSubmit={handleSubmit}
            className="bg-slate-300 max-w-sm rounded-md p-4 mx-auto mt-10"
          >
            <h1 className="text-xl font-bold uppercase text-center">
              {params.id ? "EDIT TASK " : "NEW TASK"}
            </h1>

            <label className="block">Title</label>
            <input
              type="text"
              name="title"
              placeholder="Title"
              className="block w-full rounded-sm px-2 py-1 uppercase"
              onChange={handleChange}
              value={values.title}
            />
            <label className="block">Description</label>
            <textarea
              name="description"
              rows="3"
              placeholder="Type description"
              className="block w-full rounded-sm px-2 py-1"
              onChange={handleChange}
              value={values.description}
            ></textarea>
            <button
              type="submit"
              disabled={isSubmitting}
              className="block bg-indigo-500 px-2 py-1 text-white rounded-md w-full"
            >
              {isSubmitting ? "Saving..." : "Save"}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default TaskForm;
