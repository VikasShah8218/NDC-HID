from django.db import models
from apps.controller.models import Card


class Department(models.Model):
    class Meta:
        db_table = "HID_department" 

    def __str__(self):
        return self.name
    name = models.CharField(max_length=255, unique=True)  # DEPT_NAME, with a max length of 255
    created_on = models.DateTimeField(auto_now_add=True)  # CREATED_ON as a DateTime field
    updated_on = models.DateTimeField(auto_now=True)  # UPDATED_ON as a DateTime field


class Designation(models.Model):
    class Meta:
        db_table = "HID_designation" 

    def __str__(self):
        return self.name
    name = models.CharField(max_length=255, unique=True)  # DEPT_NAME, with a max length of 255
    created_on = models.DateTimeField(auto_now_add=True)  # CREATED_ON as a DateTime field
    updated_on = models.DateTimeField(auto_now=True)  # UPDATED_ON as a DateTime field


class Employee(models.Model):
    class Meta:
        db_table = "Employee"

    def __str__(self):
        return self.name
    
    card = models.ForeignKey(Card, on_delete=models.SET_NULL, null=True, blank=True, related_name="employee_card" ) 
    cpf_no = models.CharField(max_length=255, null=True, blank=True)  # EMP_CPFNo
    name = models.CharField(max_length=255, null=True, blank=True)  # EMP_NAME
    marks = models.TextField(null=True, blank=True)  # EMP_ID_MARKS
    address = models.TextField(null=True, blank=True)  # EMP_ADDR_PAR
    mobile_no = models.CharField(max_length=20, null=True, blank=True)  # EMP_MOBILE_NO
    phone_landline = models.CharField(max_length=20, null=True, blank=True)  # EMP_PHONE_LANDLINE
    phone_dept = models.CharField(max_length=20, null=True, blank=True)  # EMP_PHONE_DEPT
    phone_ext = models.CharField(max_length=10, null=True, blank=True)  # EMP_PHONE_EXT
    blood_group = models.CharField(max_length=10, null=True, blank=True)  # EMP_BLOOD_GROUP
    dob = models.DateField(null=True, blank=True)  # EMP_DOB
    level = models.CharField(max_length=50, null=True, blank=True)  # EMP_LEVEL
    email = models.EmailField(max_length=255, null=True, blank=True)  # EMP_EMAIL
    date_of_joining = models.DateField(null=True, blank=True)  # EMP_DOJ
    department = models.ForeignKey(Department, on_delete=models.SET_NULL, null=True, blank=True, related_name="employee_department" ) 
    designation = models.CharField(max_length=255, null=True, blank=True)  # EMP_DESG
    photo = models.BinaryField(null=True, blank=True)  # EMP_PHOTO (stored as binary data)
    active = models.BooleanField(default=True)  # ACTIVE
    created_on = models.DateTimeField(auto_now_add=True)  # CREATED_ON
    updated_on = models.DateTimeField(auto_now=True)  # UPDATED_ON


    




import csv
from datetime import datetime
from django.utils.timezone import make_aware

def populate_departments_from_csv(csv_file_path="old_database/NDC_department_data.csv"):
    try:
        with open(csv_file_path, mode='r', encoding='utf-8') as file:
            reader = csv.DictReader(file)

            # Map the CSV columns to model fields
            for row in reader:
                dept_name = row['DEPT_NAME']
                created_on = make_aware(datetime.strptime(row['CREATED_ON'], '%Y-%m-%d %H:%M:%S.%f'))
                updated_on = make_aware(datetime.strptime(row['UPDATED_ON'], '%Y-%m-%d %H:%M:%S.%f'))

                # Check if department already exists
                department, created = Department.objects.update_or_create(
                    name=dept_name,
                    defaults={'created_on': created_on, 'updated_on': updated_on}
                )

                if created:
                    print(f"Created new department: {department.name}")
                else:
                    print(f"Updated existing department: {department.name}")
        print("Data successfully populated into the database.")
    except Exception as e:
        print(f"Error occurred: {e}")

def populate_designation(csv_file_path="old_database/Designation.csv"):
    try:
        with open(csv_file_path, mode='r', encoding='utf-8') as file:
            reader = csv.DictReader(file)

            # Map the CSV columns to model fields
            for row in reader:
                dept_name = row['DESG_NAME']
                created_on = make_aware(datetime.strptime(row['CREATED_ON'], '%Y-%m-%d %H:%M:%S.%f'))
                updated_on = make_aware(datetime.strptime(row['UPDATED_ON'], '%Y-%m-%d %H:%M:%S.%f'))

                # Check if department already exists
                department, created = Designation.objects.update_or_create(
                    name=dept_name,
                    defaults={'created_on': created_on, 'updated_on': updated_on}
                )

                if created:
                    print(f"Created new department: {department.name}")
                else:
                    print(f"Updated existing department: {department.name}")
        print("Data successfully populated into the database.")
    except Exception as e:
        print(f"Error occurred: {e}")

def populate_card(csv_file_path="old_database/card.csv"):
    from apps.controller.models import Card
    try:
        with open(csv_file_path, mode='r', encoding='utf-8') as file:
            reader = csv.DictReader(file)

            # Map the CSV columns to model fields
            for row in reader:
                unique_id = row['HID_CardUniqueID'] if row['HID_CardUniqueID'].strip() else None
                csn_number = row['HID_cardCSNNumber'] if row['HID_cardCSNNumber'].strip() else None
                card_number = row['HID_EmployeeHIDcardNO'] if row['HID_EmployeeHIDcardNO'].strip() else None
                allot_status = True if row['HID_EmployeeAlotstatus'] == "1" else False

                # Log which fields are missing
                if not unique_id:
                    print("Missing unique_id in row.")
                if not csn_number:
                    print("Missing csn_number in row.")
                if not card_number:
                    print("Missing card_number in row.")

                # Check if department already exists
                department, created = Card.objects.update_or_create(
                    card_number=card_number,
                    defaults={
                        'unique_id': unique_id,
                        'csn_number': csn_number,
                        'allot_status': allot_status
                    }
                )

                if created:
                    print(f"Created new Card: {card_number}")
                else:
                    print(f"Updated existing Card: {card_number}")
        print("Data successfully populated into the database.")
    except Exception as e:
        print(f"Error occurred: {e}")


# def populate_employees(csv_file_path="old_database/employee.csv"):
#     try:
#         with open(csv_file_path, mode="r", encoding="utf-8") as file:
#             reader = csv.DictReader(file)

#             for row in reader:
#                 # Retrieve or set foreign key for Card
#                 card = None
#                 if row["EMP_HIDCardNo"]:
#                     card = Card.objects.filter(card_number=row["EMP_HIDCardNo"]).first()
#                     if not card:
#                         print(f"Card with number {row['EMP_HIDCardNo']} not found. Skipping row.")
#                         continue

#                 # Retrieve or set foreign key for Department
#                 department = None
#                 if row["EMP_DEPT"]:
#                     department = Department.objects.filter(name=row["EMP_DEPT"]).first()
#                     if not department:
#                         print(f"Department with name {row['EMP_DEPT']} not found. Skipping row.")
#                         continue

#                 # Parse dates and handle null values
#                 dob = (
#                     make_aware(datetime.strptime(row["EMP_DOB"], "%Y-%m-%d"))
#                     if row["EMP_DOB"]
#                     else None
#                 )
#                 doj = (
#                     make_aware(datetime.strptime(row["EMP_DOJ"], "%Y-%m-%d"))
#                     if row["EMP_DOJ"]
#                     else None
#                 )

#                 # Handle binary photo data
#                 # photo = bytes.fromhex(row["EMP_PHOTO"]) if row["EMP_PHOTO"] else None

#                 # Create or update Employee record
#                 employee, created = Employee.objects.update_or_create(
#                     cpf_no=row["EMP_CPFNo"],
#                     defaults={
#                         "card": card,
#                         "name": row["EMP_NAME"],
#                         "marks": row["EMP_ID_MARKS"],
#                         "address": row["EMP_ADDR_PAR"],
#                         "mobile_no": row["EMP_MOBILE_NO"],
#                         "phone_landline": row["EMP_PHONE_LANDLINE"],
#                         "phone_dept": row["EMP_PHONE_DEPT"],
#                         "phone_ext": row["EMP_PHONE_EXT"],
#                         "blood_group": row["EMP_BLOOD_GROUP"],
#                         "dob": dob,
#                         "level": row["EMP_LEVEL"],
#                         "email": row["EMP_EMAIL"],
#                         "date_of_joining": doj,
#                         "department": department,
#                         "designation": row["EMP_DESG"],
#                         # "photo": photo,
#                         "active": row["ACTIVE"] == "1",  # Assuming '1' indicates active
#                     },
#                 )

#                 if created:
#                     print(f"Created new employee: {employee.name}")
#                 else:
#                     print(f"Updated existing employee: {employee.name}")

#         print("Data successfully populated into the database.")

#     except Exception as e:
#         print(f"Error occurred: {e}")


from datetime import datetime
from django.utils.timezone import make_aware
import csv

def populate_employees(csv_file_path="old_database/employee.csv"):
    try:
        print("-------------------Initiated Populate-----------------------")
        with open(csv_file_path, mode="r", encoding="utf-8") as file:
            reader = csv.DictReader(file)

            for row in reader:
                # Retrieve or set foreign key for Card
                card = None
                if row["EMP_HIDCardNo"]:
                    card = Card.objects.filter(card_number=row["EMP_HIDCardNo"]).first()
                    if not card:
                        print(f"Card with number {row['EMP_HIDCardNo']} not found. Skipping row.")
                        continue

                # Retrieve or set foreign key for Department
                department = None
                if row["EMP_DEPT"]:
                    department = Department.objects.filter(name=row["EMP_DEPT"]).first()
                    if not department:
                        print(f"Department with name {row['EMP_DEPT']} not found. Skipping row.")
                        continue

                # Parse dates and handle null values
                dob = (
                    make_aware(datetime.strptime(row["EMP_DOB"], "%Y-%m-%d %H:%M:%S.%f"))
                    if row["EMP_DOB"]
                    else None
                )
                doj = (
                    make_aware(datetime.strptime(row["EMP_DOJ"], "%Y-%m-%d %H:%M:%S.%f"))
                    if row["EMP_DOJ"]
                    else None
                )

                # Handle binary photo data
                # photo = bytes.fromhex(row["EMP_PHOTO"]) if row["EMP_PHOTO"] else None

                # Create or update Employee record
                employee, created = Employee.objects.update_or_create(
                    cpf_no=row["EMP_CPFNo"],
                    defaults={
                        "card": card,
                        "name": row["EMP_NAME"],
                        "marks": row["EMP_ID_MARKS"],
                        "address": row["EMP_ADDR_PAR"],
                        "mobile_no": row["EMP_MOBILE_NO"],
                        "phone_landline": row["EMP_PHONE_LANDLINE"],
                        "phone_dept": row["EMP_PHONE_DEPT"],
                        "phone_ext": row["EMP_PHONE_EXT"],
                        "blood_group": row["EMP_BLOOD_GROUP"],
                        "dob": dob,
                        "level": row["EMP_LEVEL"],
                        "email": row["EMP_EMAIL"],
                        "date_of_joining": doj,
                        "department": department,
                        "designation": row["EMP_DESG"],
                        # "photo": photo,
                        "active": row["ACTIVE"] == "1",  # Assuming '1' indicates active
                    },
                )

                if created:
                    print(f"Created new employee: {employee.name}")
                else:
                    print(f"Updated existing employee: {employee.name}")

        print("Data successfully populated into the database.")

    except Exception as e:
        print(f"Error occurred: {e}")
