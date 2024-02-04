import React from 'react'
import jsPDF from 'jspdf'
import 'jspdf-autotable'
import PrimaryButton from '../PrimaryButton'
import { MobileBtn } from './styles'
import { ExportOutlined } from '@ant-design/icons'

export default function ExportButton ({ userData, single, mobileView }) {
  const generateMultiUserPDF = () => {
    const doc = new jsPDF()

    doc.setFontSize(18)
    doc.text('User Data', 10, 10) // Add a title

    const tableData = userData.map(user => [
      user.name,
      user.email,
      user.phoneNumber,
      user.snapchat || '- -',
      user.instagram || '- -',
      user.tiktok || '- -',
      user.isLicensed ? 'Yes' : 'No',
      user.isApproved ? 'Verified' : 'Pending'
    ])

    // Define the columns for the table
    const tableColumns = [
      'Name',
      'Email',
      'Phone Number',
      'Snapchat',
      'Instagram',
      'TikTok',
      'Licensed',
      'Status'
    ]

    doc.setFontSize(9)
    doc.autoTable({
      head: [tableColumns], // Add the table headers
      body: tableData, // Add the table data
      startY: 20, // Start the table from vertical position 20
      theme: 'grid', // Set the theme to 'plain'
      styles: {
        fontSize: 10
      }
    })

    doc.save('user_data.pdf') // Save the PDF
  }

  const generateSingleUserPDF = () => {
    const doc = new jsPDF()

    doc.setFontSize(18)
    doc.text('User Details', 10, 10) // Add a title

    const lineHeight = 10

    doc.setFontSize(11)
    doc.text(`Name: ${userData.name}`, 10, 20)
    doc.text(`Email: ${userData.email}`, 10, 20 + lineHeight)
    doc.text(`Phone Number: ${userData.phoneNumber}`, 10, 20 + lineHeight * 2)
    doc.text(`Snapchat: ${userData.snapchat || '- -'}`, 10, 20 + lineHeight * 3)
    doc.text(
      `Instagram: ${userData.instagram || '- -'}`,
      10,
      20 + lineHeight * 4
    )
    doc.text(`TikTok: ${userData.tiktok || '- -'}`, 10, 20 + lineHeight * 5)
    doc.text(
      `Licensed: ${userData.licensed ? 'Yes' : 'No'}`,
      10,
      20 + lineHeight * 6
    )
    doc.text(
      `Status: ${userData.status === 'verified' ? 'Verified' : 'Pending'}`,
      10,
      20 + lineHeight * 7
    )

    doc.save(`${userData.name}_details.pdf`) // Save the PDF with user's name
  }
  return mobileView ? (
    <MobileBtn>
      <ExportOutlined
        onClick={single ? generateSingleUserPDF : generateMultiUserPDF}
      />
    </MobileBtn>
  ) : (
    <PrimaryButton
      text={'Export Record'}
      onClick={single ? generateSingleUserPDF : generateMultiUserPDF}
    />
  )
}
