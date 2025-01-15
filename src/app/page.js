"use client";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Banner from "./components/Banner";
import Thead from "./components/Thead";
import { IoIosAlert } from "react-icons/io";

export default function Home() {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm({});
  const [alert, setAlert] = useState("");
  const [update, setUpdate] = useState();

  const [selectedTodo, setSelectedTodo] = useState(null);
  useEffect(() => {
  setValue('name',selectedTodo?.name)
  setValue('email',selectedTodo?.email)
  setValue('address',selectedTodo?.address)
  setValue('birthDate',selectedTodo?.birthDate)
  setValue('gender',selectedTodo?.gender)
  setValue('level',selectedTodo?.level)
  setValue('phone',selectedTodo?.phone)
  }, [selectedTodo])
  console.log(selectedTodo)
      const [todos, setTodos] = useState([]);
  useEffect(() => {
    localStorage.getItem("todos") === null
      ? setTodos([])
      : setTodos(JSON.parse(localStorage.getItem("todos")));
  }, []);
  const [exist, setExist] = useState(false);
  setTimeout(() => {
    exist === true ? setExist(false) : null;
  }, 2000);

  const [searchVal, setSearchVal] = useState("");
  useEffect(() => {
    const search = () => {
      const newTodos = JSON.parse(localStorage.getItem("todos"));
      if (searchVal === "") {
        setTodos(newTodos);
      } else {
        setTodos(
          newTodos.filter((todo) =>
            todo.name.toLowerCase()?.includes(searchVal.toLowerCase())
          )
        );
      }
    };
    search();
  }, [searchVal]);

  const [id, setId] = useState();

  const onSubmit = (data) => {
    if (
      todos?.some(
        (todo) =>
          todo.name === data.name &&
          todo.email === data.email &&
          todo.address === data.address &&
          todo.phone === data.phone &&
          todo.birthDate === data.birthDate &&
          todo.gender === data.gender &&
          todo.level === data.level
      )
    ) {
      setExist(true);
    } else {
      const newTodo = { ...data, id: Date.now() };
      var newTodos;
      if(selectedTodo!=null){
      const todosAfterDelete=todos.filter((todo)=>todo.id!=id)
       newTodos=Array.isArray(todos) ? [newTodo, ...todosAfterDelete] : [newTodo]

      }else{

        newTodos = Array.isArray(todos) ? [newTodo, ...todos] : [newTodo];
      }

      setTodos(newTodos);
      localStorage.setItem("todos", JSON.stringify(newTodos));
      reset();
    }
  };

  return (
    <div className="relative  ">
      {alert !== "" ? (
        <section className="absolute bottom-0   h-full w-full  bg-black bg-opacity-90 ">
          <div className="bg-white  w-full sm:w-fit p-10 rounded-2xl sticky  top-1/2 left-1/2 sm:-translate-x-1/2 -translate-y-1/2">
                <h2 className="font-semibold text-xl capitalize mb-10 text-center">
                  are you sure you want to delete...?
                </h2>
                <div className="mt-6 flex items-center justify-center gap-14">
                  <button
                    type="button"
                    className="capitalize rounded-md bg-indigo-600 px-7 py-3 text-sm font-semibold  text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    onClick={() => {
                      const newTodos = todos.filter((todo) => todo.id !== id);
                      setTodos(newTodos);
                      localStorage.setItem("todos", JSON.stringify(newTodos));
                      setAlert("");
                    }}
                  >
                    confirm
                  </button>
                  <button
                    type="submit"
                    className=" capitalize text-sm font-semibold leading-6 px-7 py-3 text-gray-900 hover:bg-indigo-700 hover:text-white transition-all  rounded-md"
                    onClick={() => setAlert("")}
                  >
                    cancel
                  </button>
                </div>
   
          </div>
        </section>
      ) : null}

      <div className=" md:mx-5 mx-3   " id="form">
        <Banner />
        <main>
          <form onSubmit={handleSubmit(onSubmit)} >
            <div className="space-y-12">
              <div className="border-b border-gray-900/10 pb-12">
                <div className="mt-10 grid grid-cols-1 gap-x-6 sm:gap-y-4 sm:grid-cols-6">
                  <div className="sm:col-span-3 ">
                    <label
                      htmlFor="name"
                      className="block text-sm sm:text-lg font-medium leading-6 text-gray-900 capitalize"
                    >
                      name :
                    </label>
                    <div className="mt-2">
                      <input
                        {...register("name", {
                          required: "* username is required",
                        })}
                        id="name"
                        name="name"
                        type="text"
                        autoComplete="name"
                        className="block w-full text-gray-900 indent-2 pe-2 rounded-md outline-indigo-800   py-3  ring-gray-300 ring-1  sm:text-sm sm:leading-6"
                      />
                      <p className="text-red-800 mt-3 capitalize">
                        {errors.name?.message}
                      </p>
                    </div>
                  </div>

                  <div className="sm:col-span-2 ">
                    <label
                      htmlFor="email"
                      className="block text-sm sm:text-lg  font-medium leading-6 text-gray-900 capitalize"
                    >
                      email :
                    </label>
                    <div className="mt-2">
                      <input
                        {...register("email", {
                          required: "* Email is required",
                          pattern: {
                            value:
                              /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                            message: "* Invalid email address",
                          },
                        })}
                        type="email"
                        name="email"
                        id="email"
                        autoComplete="email"
                        className="block w-full text-gray-900 indent-2 pe-2 rounded-md outline-indigo-800   py-3  ring-gray-300 ring-1  sm:text-sm sm:leading-6"
                      />
                      <p className="text-red-800 mt-3 capitalize">
                        {errors.email?.message}
                      </p>
                    </div>
                  </div>

                  <div className="sm:col-span-2">
                    <label
                      htmlFor="address"
                      className="block text-sm sm:text-lg  font-medium leading-6 text-gray-900 capitalize"
                    >
                      address :
                    </label>
                    <div className="mt-2">
                      <input
                        {...register("address", {
                          required: "* address is required",
                        })}
                        type="text"
                        name="address"
                        id="address"
                        autoComplete="address"
                        className="block w-full text-gray-900 indent-2 pe-2 rounded-md outline-indigo-800   py-3  ring-gray-300 ring-1  sm:text-sm sm:leading-6"
                      />
                      <p className="text-red-800 mt-3 capitalize">
                        {errors.address?.message}
                      </p>
                    </div>
                  </div>

                  <div className="sm:col-span-2">
                    <label
                      htmlFor="phone"
                      className="block text-sm sm:text-lg  font-medium leading-6 text-gray-900 capitalize"
                    >
                      phone :
                    </label>
                    <div className="mt-2">
                      <input
                        {...register("phone", {
                          required: "* phone number is required",
                          pattern: {
                            value: /^(\+?[1-9]\d{0,2})?\s?\d{9,11}$/,
                            message: "* invalid pattern",
                          },
                        })}
                        type="number"
                        name="phone"
                        id="phone"
                        autoComplete="phone"
                        className="block w-full text-gray-900 indent-2 pe-2 rounded-md outline-indigo-800    py-3  ring-gray-300 ring-1  sm:text-sm sm:leading-6"
                      />
                      <p className="text-red-800 mt-3 capitalize">
                        {errors.phone?.message}
                      </p>
                    </div>
                  </div>
                  <div className="sm:col-span-2">
                    <label
                      htmlFor="birthDate"
                      className="block text-sm sm:text-lg  font-medium leading-6 text-gray-900 capitalize"
                    >
                      birthDate :
                    </label>
                    <div className="mt-2">
                      <input
                        {...register("birthDate", {
                          required: "* birthDate is required",
                          validate: {
                            validDate: (value) => {
                              const today = new Date();
                              const selectedDate = new Date(value);
                              return (
                                selectedDate < today ||
                                "* لسا هتتولد ازاي يعني مش فاهم...؟"
                              );
                            },
                          },
                        })}
                        max="2007-12-31"
                        type="date"
                        name="birthDate"
                        id="birthDate"
                        autoComplete="birthDate"
                        className="block w-full text-gray-900 indent-2 pe-2 rounded-md outline-indigo-800    py-3  ring-gray-300 ring-1  sm:text-sm sm:leading-6"
                      />
                      <p className="text-red-800 mt-3 capitalize">
                        {errors.birthDate?.message}
                      </p>
                    </div>
                  </div>
                  <div className="sm:col-span-3">
                    <label
                      htmlFor="gender"
                      className="block text-sm sm:text-lg  font-medium leading-6 text-gray-900 capitalize"
                    >
                      gender :
                    </label>
                    <div className="mt-2 ">
                      <select
                        {...register("gender", {
                          required: "* gender is required",
                        })}
                        id="gender"
                        name="gender"
                        autoComplete="gender"
                        className="block w-full text-gray-900 indent-2 pe-2 rounded-md outline-indigo-800    py-3  ring-gray-300 ring-1  sm:text-sm sm:leading-6"
                      >
                        <option hidden value="">
                          gender
                        </option>
                        <option>Male</option>
                        <option>Female</option>
                      </select>
                    </div>
                    <p className="text-red-800 mt-3 capitalize">
                      {errors.gender?.message}
                    </p>
                  </div>
                  <div className="sm:col-span-3">
                    <label
                      htmlFor="level"
                      className="block text-sm sm:text-lg  font-medium leading-6 text-gray-900"
                    >
                      level :
                    </label>
                    <div className="mt-2">
                      <select
                        {...register("level", {
                          required: "* level is required",
                        })}
                        id="level"
                        name="level"
                        autoComplete="level"
                        className="block w-full rounded-md border-0 py-3 text-gray-900 shadow-sm ring-1 px-2 ring-inset ring-gray-300 focus:outline-indigo-800  sm:max-w-xl sm:text-sm sm:leading-6"
                      >
                        <option hidden value="">
                          level
                        </option>
                        <option> junior</option>
                        <option>mid-level</option>
                        <option>senior</option>
                      </select>
                    </div>
                    <p className="text-red-800 mt-3 capitalize">
                      {errors.level?.message}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 flex items-center justify-center gap-14">
              <button
                type="submit"
                className=" capitalize text-sm font-semibold leading-6 px-7 py-3 text-gray-900 hover:bg-indigo-700 hover:text-white transition-all  rounded-md"
              >
                confirm
              </button>
              <button
                type="button"
                className="capitalize rounded-md bg-indigo-600 px-7 py-3 text-sm font-semibold  text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                onClick={() => reset()}
              >
                cancel
              </button>
            </div>
          </form>
          <input
            type="search"
            placeholder="Search by name"
            className="text-black  sm:w-1/2 w-full sm:flex mx-3 sm:mx-auto indent-2 h-12 sm:pe-2 my-5 outline-none focus:border-indigo-800 rounded-md  focus:shadow-xl border-gray-400 border-2"
            onChange={(e) => {
              setSearchVal(e.target.value);
            }}
            value={searchVal}
          />
        </main>
        <section className="w-full overflow-x-scroll scrollbar-hide">
          {todos?.length > 0 ? (
            <table className="  table-auto w-full overflow-x-scroll  mb-5 sm:my-10 ">
              <Thead />

              <tbody>
                {todos?.map((todo, index) => (
                  <tr key={index} >
                    <th
                      className={`text-start rounded-s-lg ${
                        (index + 1) % 2 === 0 ? "bg-gray-900 text-white" : null
                      } font-medium  px-3 py-3`}
                    >
                      {index + 1}.
                    </th>
                    <th
                      className={`text-start ${
                        (index + 1) % 2 === 0 ? "bg-gray-900 text-white" : null
                      } 
        font-medium  px-3 py-3`}
                    >
                      {todo.name}
                    </th>
                    <th
                      className={`text-start ${
                        (index + 1) % 2 === 0 ? "bg-gray-900 text-white" : null
                      } font-medium  px-3 py-3`}
                    >
                      {todo.email}
                    </th>
                    <th
                      className={`text-start ${
                        (index + 1) % 2 === 0 ? "bg-gray-900 text-white" : null
                      } font-medium  px-3 py-3`}
                    >
                      {todo.address}
                    </th>
                    <th
                      className={`text-start ${
                        (index + 1) % 2 === 0 ? "bg-gray-900 text-white" : null
                      } font-medium  px-3 py-3`}
                    >
                      {todo.phone}
                    </th>
                    <th
                      className={`text-start ${
                        (index + 1) % 2 === 0 ? "bg-gray-900 text-white" : null
                      } font-medium  px-2 py-3`}
                    >
                      {todo.birthDate}
                    </th>
                    <th
                      className={`text-start ${
                        (index + 1) % 2 === 0 ? "bg-gray-900 text-white" : null
                      } font-medium  px-3 py-3`}
                    >
                      {todo.gender}
                    </th>
                    <th
                      className={`text-start rounded-e-lg ${
                        (index + 1) % 2 === 0 ? "bg-gray-900 text-white" : null
                      } font-medium  px-3 py-3`}
                    >
                      {todo.level}
                    </th>
                    <th className="font-medium px-4 ">
                      <button
                        className={` ${
                          index % 2 === 0
                            ? "bg-amber-500 text-white lg:hover:border-2 lg:hover:bg-white lg:hover:text-amber-500 lg:hover:border-amber-500"
                            : "border-2 border-amber-500 text-amber-500 lg:hover:border-amber-500 lg:hover:bg-amber-500 lg:hover:text-white"
                        } rounded-md py-1 px-2`}
                        onClick={() => {  
                          setSelectedTodo(todo)
                          setId(todo.id)                          
                        }}
                      >
                        <a href="#form">

                        update
                        </a>
                      </button>
                    </th>
                    <th className="font-medium px-4 ">
                      <button
                        className={` ${
                          index % 2 === 1
                            ? "bg-red-500 text-white lg:hover:border-2 lg:hover:bg-white lg:hover:text-red-500 lg:hover:border-red-500"
                            : "border-2 border-red-500 text-red-500 lg:hover:border-red-500 lg:hover:bg-red-500 lg:hover:text-white"
                        } rounded-md py-1 px-2`}
                        onClick={() => {
                          setId(todo.id);
                          setAlert('delete')
                        }}
                      >
                        delete
                      </button>
                    </th>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="text-center capitalize mt-20 text-3xl font-bold">
              no data here
            </p>
          )}
        </section>
      </div>

      {exist ? (
        <div className=" flex items-center gap-4   rounded-lg  text-white bg-red-500  sticky w-fit bottom-3/4 left-full  me-4  p-4 capitalize  ">
          <IoIosAlert className="text-3xl" />
          this user is already exist
        </div>
      ) : null}
    </div>
  );
}
