<div class="container mt-5">

  <h1 class="text-primary mb-4">
    <% if (menu) { %> <%= menu.title %> <% } else { %> Monseu’s Inventory <% }
    %>
  </h1>

  <p style="max-width: 50%; line-height: 2" class="mb-4">
    <% if (menu && menu.description) { %> <%= menu.description %> <% } else { %>
    Having trouble managing your inventory stock? Monseu Inventory makes it easy
    track, organize, and optimize your inventory, ensuring smooth operations
    every day!
    <!-- Display default text if 'menu.description' is not defined -->
    <% } %>
  </p>

  <a href="/admin/stock" class="btn btn-primary">Look At Stock</a>
  <img src="/images/banner.png" class="img-fluid rounded mt-4" alt="" />
  <p style="line-height: 2; text-align: justify">
    <% if (menu && menu.text1) { %> <%= menu.text1 %>
    <!-- Display the text1 from the 'menu' object -->
    <% } else { %> Managing inventory can be a complex and time-consuming task,
    from tracking stock levels to avoiding shortages or overstock. Without a
    reliable system, businesses often face inefficiencies that lead to lost
    sales, wasted resources, and operational delays. Monseu Inventory is here to
    change that by providing a smarter, more efficient way to manage stock with
    ease.
    <!-- Display default text if 'menu.text1' is not defined -->
    <% } %>
  </p>

  <p style="line-height: 2; text-align: justify">
    <% if (menu && menu.text2) { %> <%= menu.text2 %>
    <!-- Display the text2 from the 'menu' object -->
    <% } else { %> With Monseu Inventory, you can monitor stock levels in real
    time, update inventory seamlessly, and generate insightful reports to help
    optimize your business. Our intuitive platform is designed to simplify stock
    management, reduce human errors, and improve overall efficiency. Whether you
    need to track incoming shipments, set up automatic restocking alerts, or
    analyze sales trends, Monseu Inventory has the tools to keep your operations
    running smoothly. <% } %>
  </p>
</div>
