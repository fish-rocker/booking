(function () {
  const currentScript = document.currentScript;

  const config = {
    target: currentScript.dataset.target || "body",
    businessName: currentScript.dataset.businessName || "線上預約",
    serviceType: currentScript.dataset.serviceType || "restaurant",
    apiUrl: currentScript.dataset.apiUrl || null,
  };

  const target = document.querySelector(config.target);
  if (!target) return;

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
        box-shadow: 0 8px 24px rgba(0,0,0,.08);
      }

      h3 {
        margin: 0 0 16px;
        font-size: 22px;
      }

      label {
        display: block;
        margin-top: 12px;
        font-size: 14px;
        color: #333;
      }

      input, select, textarea, button {
        width: 100%;
        box-sizing: border-box;
        margin-top: 6px;
        padding: 10px;
        border-radius: 8px;
        border: 1px solid #ccc;
        font-size: 14px;
      }

      button {
        margin-top: 18px;
        border: none;
        background: #111;
        color: white;
        cursor: pointer;
        font-weight: bold;
      }

      button:hover {
        background: #333;
      }

      .success {
        margin-top: 12px;
        padding: 10px;
        background: #e8f8ee;
        color: #176b35;
        border-radius: 8px;
        display: none;
      }
    </style>

    <div class="booking-box">
      <h3>${config.businessName}</h3>

      <form id="bookingForm">
        <label>
          服務項目
          <select name="service" required>
            <option value="">請選擇</option>
            <option value="dining">餐廳訂位</option>
            <option value="spa">SPA 預約</option>
            <option value="stay">民宿住宿</option>
            <option value="other">其他服務</option>
          </select>
        </label>

        <label>
          日期
          <input type="date" name="date" required />
        </label>

        <label>
          時間
          <select name="time" required>
            <option value="">請選擇</option>
            <option>10:00</option>
            <option>11:00</option>
            <option>12:00</option>
            <option>13:00</option>
            <option>14:00</option>
            <option>15:00</option>
            <option>16:00</option>
            <option>17:00</option>
            <option>18:00</option>
            <option>19:00</option>
          </select>
        </label>

        <label>
          人數
          <input type="number" name="people" min="1" value="2" required />
        </label>

        <label>
          姓名
          <input type="text" name="name" required />
        </label>

        <label>
          電話
          <input type="tel" name="phone" required />
        </label>

        <label>
          備註
          <textarea name="note" rows="3"></textarea>
        </label>

        <button type="submit">送出預約</button>

        <div class="success" id="successMsg">
          預約已送出，我們會盡快與您確認。
        </div>
      </form>
    </div>
  `;

  target.appendChild(wrapper);

  const form = shadow.querySelector("#bookingForm");
  const successMsg = shadow.querySelector("#successMsg");

  form.addEventListener("submit", async function (e) {
    e.preventDefault();

    const formData = new FormData(form);

    const bookingData = {
      businessName: config.businessName,
      serviceType: config.serviceType,
      service: formData.get("service"),
      date: formData.get("date"),
      time: formData.get("time"),
      people: formData.get("people"),
      name: formData.get("name"),
      phone: formData.get("phone"),
      note: formData.get("note"),
      createdAt: new Date().toISOString(),
    };

    console.log("Booking submitted:", bookingData);

    if (config.apiUrl) {
      await fetch(config.apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bookingData),
      });
    }

    successMsg.style.display = "block";
    form.reset();
  });
})();
