<!DOCTYPE html>
<html>
  <head>
    <title>Home Customer</title>

    <!-- Import Google Font: Gluten -->
    <link
      href="https://fonts.googleapis.com/css2?family=Gluten:wght@400;700&display=swap"
      rel="stylesheet"
    />

    <!-- Bootstrap CSS -->
    <link
      href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.5/dist/css/bootstrap.min.css"
      rel="stylesheet"
      integrity="sha384-SgOJa3DmI69IUzQ2PVdRZhwQ+dy64/BUtbMJw1MZ8t5HZApcHrRKUc4W0kG879m7"
      crossorigin="anonymous"
    />

    <link
      rel="stylesheet"
      href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.2/css/all.min.css"
      integrity="sha512-Evv84Mr4kqVGRNSgIGL/F/aIDqQb7xQ2vcrdIwxfjThSH8CSR7PBEakCr51Ck+w+/U6swU2Im1vVX0SVk9ABhg=="
      crossorigin="anonymous"
      referrerpolicy="no-referrer"
    />

    <style>
      .gluten {
        font-family: "Gluten";
      }

      :root {
        --bs-primary: #36007d;
      }

      body {
        display: flex;
        flex-direction: column;
        min-height: 100vh;
        margin: 0;
      }

      .btn-primary {
        background-color: var(--bs-primary) !important;
        border-color: var(--bs-primary) !important;
      }

      .bg-primary {
        background-color: var(--bs-primary) !important;
      }

      .text-primary {
        color: var(--bs-primary) !important;
      }

      .text-large {
        font-size: 50px;
      }

      .main-content {
        flex: 1;
      }
    </style>
  </head>
  <body>
    <nav class="navbar bg-body-tertiary">
      <div class="container">
        <a class="navbar-brand gluten text-primary" style="font-size: 25px"
          >Monseu</a
        >
        <div class="d-flex">
          <a
            href="/popular"
            class="btn <%= (path === '/popular') ? 'btn-primary text-white' : 'text-primary' %>"
          >
            Popular Right Now
          </a>
          <a
            href="/dashboard"
            class="btn <%= (path === '/dashboard') ? 'btn-primary text-white' : 'text-primary' %>"
          >
            Home
          </a>
        </div>
      </div>
    </nav>
    <main>
      <!-- hapus -->
    </main>
  </body>
</html>
