slider by ID

let rangeSlider = document.getElementById("sliderRange");
let output = document.getElementById("demo");
output.innerHTML = rangeSlider.value;


rangeSlider.oninput = function () {
    output.innerHTML = this.value;
    fr = parseInt(this.value)
}

boxColors select form

<select class="form-select" id="boxColors" aria-label="Default select example">
    <option selected>Color of box</option>
    <option value="#ff0000">red</option>
    <option value="#00ff00">green</option>
    <option value="#0000ff">blue</option>
</select>


Switches

<div class="form-check form-switch">
  <input class="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault">
  <label class="form-check-label" for="flexSwitchCheckDefault">Default switch checkbox input</label>
</div>
<div class="form-check form-switch">
  <input class="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckChecked" checked>
  <label class="form-check-label" for="flexSwitchCheckChecked">Checked switch checkbox input</label>
</div>
<div class="form-check form-switch">
  <input class="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDisabled" disabled>
  <label class="form-check-label" for="flexSwitchCheckDisabled">Disabled switch checkbox input</label>
</div>
<div class="form-check form-switch">
  <input class="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckCheckedDisabled" checked disabled>
  <label class="form-check-label" for="flexSwitchCheckCheckedDisabled">Disabled checked switch checkbox input</label>
</div>


