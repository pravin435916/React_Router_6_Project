import React, { useEffect } from 'react'
import { Link, Outlet, useLoaderData ,redirect,Form,NavLink,useSubmit} from 'react-router-dom'
import { getContacts ,createContact} from '../contacts'
import { useNavigation } from 'react-router-dom'

export async function action() {
    const contact = await createContact()
    return redirect(`/contacts/${contact.id}/edit`);
}

export async function loader({request}) {
    const url = new URL(request.url)
    const q = url.searchParams.get("q")
    const contacts = await getContacts(q)
    return { contacts ,q};
}

function Root() {
    const navigation = useNavigation()
    const submit = useSubmit()
    const { contacts ,q} = useLoaderData();
    const searching = navigation.location &&  new URLSearchParams(navigation.location.search).has("q");
    useEffect(() => {
        document.getElementById("q").value = q;
      }, [q]);
    return (
        <>
            <div id="sidebar">
                <h1>React Router Contacts</h1>
                <div>
                    <Form id="search-form" role="search">
                        <input
                            id="q"
                            className={searching ? "loading" : ""}
                            aria-label="Search contacts"
                            placeholder="Search"
                            type="search"
                            name="q"
                            defaultValue={q}
                            onChange={(event) => {
                                const first = q == null;
                                submit(event.currentTarget.form,{replace:!first});
                              }}
                        />
                        <div
                            id="search-spinner"
                        
                            aria-hidden
                            hidden={!searching}
                        />
                        <div
                            className="sr-only"
                            aria-live="polite"
                        ></div>
                    </Form>
                    <Form method="post">
                        <button type="submit">New</button>
                    </Form>
                </div>
                <nav>
                {contacts.length ? (
            <ul>
              {contacts.map((contact) => (
                <li key={contact.id}>
                  <NavLink to={`contacts/${contact.id}`}
                  className={({ isActive, isPending }) =>
                  isActive
                    ? "active"
                    : isPending
                    ? "pending"
                    : ""
                }>
                    {contact.first || contact.last ? (
                      <>
                        {contact.first} {contact.last}
                      </>
                    ) : (
                      <i>No Name</i>
                    )}
                    {contact.favorite && <span>★</span>}
                  </NavLink>
                </li>
              ))}
            </ul>
          ) : (
            <p>
              <i>No contacts</i>
            </p>
          )}
          </nav>
      {/* <ul>
        <li>
          <Link to={`/contacts/1`}>Pravin</Link>
        </li>
        <li>
          <Link to={`/contacts/2`}>Vansh</Link>
        </li>
      </ul> */}
            </div>
            <div className={
                navigation.state === "loading" ? "loading" : ""
              }
               id="detail">
                <Outlet />
            </div>
        </>
    )
}

export default Root