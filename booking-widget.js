(function () {
  const globalConfig = window.BookingWidgetConfig || {};

  const config = {
    target: globalConfig.target,
    businessName: globalConfig.businessName || "線上預約",
    serviceType: globalConfig.serviceType || "restaurant",
    apiUrl: globalConfig.apiUrl || null,
  };

  const target = document.querySelector(config.target);

  if (!target) {
    console.warn("Booking target not found:", config.target);
    return;
  }

  const wrapper = document.createElement("div");
  const shadow = wrapper.attachShadow({ mode: "open" });

  shadow.innerHTML = `
    <style>
      .booking-box {
        max-width: 420px;
        font-family: Arial, sans-serif;
        border: 1px solid #ddd;
        border-radius: 16px;
        padding: 20px;
        background: #fff;
      }

      input, select, textarea, button {
        width: 100%;
        box-sizing: border-box;
        margin-top: 8px;
        padding: 10px;
      }

      button {
        background: #111;
        color: #fff;
        border: none;
        cursor: pointer;
      }
    </style>

    <div class="booking-box">
      <h3>${config.businessName}</h3>

      <form id="bookingForm">
        <input type="date" name="date" required />
        <select name="time" required>
          <option value="">請選擇時間</option>
          <option>10:00</option>
          <option>11:00</option>
          <option>12:00</option>
          <option>13:00</option>
        </select>
        <input type="text" name="name" placeholder="姓名" required />
        <input type="tel" name="phone" placeholder="電話" required />
        <textarea name="note" placeholder="備註"></textarea>
        <button type="submit">送出預約</button>
        <div id="successMsg" style="display:none;margin-top:10px;">
          預約已送出
        </div>
      </form>
    </div>
  `;

  target.innerHTML = "";
  target.appendChild(wrapper);
})();
